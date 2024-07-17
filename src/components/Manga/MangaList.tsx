"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";

import { MangaCard } from "@/components/Manga/Card/Card";
import { Manga } from "@/components/Manga/Card/Card";
import { usePathname } from "next/navigation";
import { emotions } from "@/dataset";

interface JikanResponse {
  data: Manga[];
}

const MangaList: React.FC = () => {
  const pathname = usePathname();

  const genre = emotions.find(
    (emotion) => emotion.emotion === pathname.split("/")[1]
  )?.genre;

  //   const [genre, setGenre] = useState<string | undefined>(genreFromPathname);
  const [mangaList, setMangaList] = useState<Manga[]>([]);

  useEffect(() => {
    if (genre) {
      searchManga();
    }
  }, [genre]);

  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };
  const searchManga = async (): Promise<void> => {
    try {
      const { data } = await axios.get<JikanResponse>(
        `https://api.jikan.moe/v4/manga?q=${genre}&sfw=true&order_by=popularity`
      );

      const hiddenManga = localStorage.getItem("hiddenManga");
      if (hiddenManga) {
        const hiddenMangaList = JSON.parse(hiddenManga);
        data.data = data.data.filter(
          (manga: any) => !hiddenMangaList.includes(manga.mal_id)
        );
      }
      const manga = data.data.map((manga: any) => {
        const imageWebp = manga.images.webp.large_image_url;
        const imageJpg = manga.images.jpg.large_image_url;

        return {
          mal_id: manga.mal_id,
          title: manga.title,
          url: manga.url,
          synopsis: manga.synopsis ? truncateString(manga.synopsis, 200) : "",
          score: manga.score,
          image: imageWebp || imageJpg,
          date: manga.published.string,
          genres: manga.genres.map((genre: { name: string }) => genre.name),
        };
      });
      setMangaList(manga);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };
  return <div>{mangaList.length && <MangaCard manga={mangaList[0]} />}</div>;
};

export default MangaList;

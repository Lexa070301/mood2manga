"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EmotionCard } from "@/components/Emotions/Card/Card";
import { MangaCard } from "@/components/MangaCard/MangaCard";
import { emotions } from "@/dataset";
import { Manga } from "@/components/MangaCard/MangaCard";

interface JikanResponse {
  data: Manga[];
}

const MangaSearch: React.FC = () => {
  const [genre, setGenre] = useState<string>("");
  const [mangaList, setMangaList] = useState<Manga[]>([]);

  useEffect(() => {
    if (genre) {
      searchManga();
    }
  }, [genre]);

  const searchManga = async (): Promise<void> => {
    try {
      const { data } = await axios.get<JikanResponse>(
        `https://api.jikan.moe/v4/manga?q=${genre}&sfw=true&order_by=popularity`
      );
      const manga = data.data.map((manga: any) => {
        const imageWebp = manga.images.webp.large_image_url;
        const imageJpg = manga.images.jpg.large_image_url;

        return {
          mal_id: manga.mal_id,
          title: manga.title,
          url: manga.url,
          synopsis: manga.synopsis,
          score: manga.score,
          image: imageWebp || imageJpg,
          date: manga.published.string,
          genres: manga.genres.map((genre: { name: string }) => genre.name),
        };
      });
      setMangaList(manga);
      console.log(manga);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {emotions.map((emotion, index) => (
          <div onClick={() => setGenre(emotion.genre)} key={index}>
            <EmotionCard text={emotion.emotion} />
          </div>
        ))}
      </div>
      {mangaList.length && <MangaCard manga={mangaList[0]} />}
    </div>
  );
};

export default MangaSearch;

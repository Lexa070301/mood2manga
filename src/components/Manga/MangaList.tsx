"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import axios from "axios";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { MangaCard } from "@/components/Manga/Card/Card";
import { Manga } from "@/components/Manga/Card/Card";
import { emotions } from "@/dataset";

interface JikanResponse {
  data: Manga[];
}

const MangaList: React.FC = () => {
  const pathname = usePathname();

  const genre = emotions.find(
    (emotion) => emotion.emotion === pathname.split("/")[1]
  )?.genre;

  const [currentManga, setCurrentManga] = useState<number>(0);
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

  const filterHiddenManga = (mangaList: Array<Manga>) => {
    const hiddenManga = localStorage.getItem("hiddenManga");
    if (hiddenManga) {
      const hiddenMangaList = JSON.parse(hiddenManga);
      mangaList = mangaList.filter(
        (manga: any) => !hiddenMangaList.includes(manga.mal_id)
      );
    }
    return mangaList;
  };

  const updateMangaList = (mangaList: Array<Manga>) => {
    let manga = filterHiddenManga(mangaList);
    manga = manga.map((manga: any) => {
      return {
        mal_id: manga.mal_id,
        title: manga.title,
        url: manga.url,
        synopsis: manga.synopsis ? truncateString(manga.synopsis, 200) : "",
        score: manga.score,
        image: manga.image
          ? manga.image
          : manga.images.webp.large_image_url ||
            manga.images.jpg.large_image_url,
        date: manga.date ? manga.date : manga.published.string,
        genres:
          typeof manga.genres[0] === "string"
            ? manga.genres
            : manga.genres.map((genre: { name: string }) => genre.name),
      };
    });
    setMangaList(manga);
    setCurrentManga(0);
  };

  const refreshMangaList = () => {
    updateMangaList(mangaList);
  };

  const searchManga = async (): Promise<void> => {
    try {
      const { data } = await axios.get<JikanResponse>(
        `https://api.jikan.moe/v4/manga?q=${genre}&sfw=true&order_by=popularity`
      );

      updateMangaList(data.data);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  const prevManga = () => {
    if (currentManga > 0) {
      setCurrentManga(currentManga - 1);
    }
  };

  const nextManga = () => {
    if (currentManga < mangaList.length - 1) {
      setCurrentManga(currentManga + 1);
    }
  };

  return (
    <div className="flex items-center flex-col w-full">
      <Header mood={pathname.split("/")[1]} />
      <div className="py-4 sm:py-10">
        <div className="flex items-start justify-center gap-0 sm:gap-7">
          <button
            onClick={prevManga}
            disabled={currentManga === 0}
            className="mt-64 disabled:opacity-50 bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-4 border left-7 sm:left-0 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {mangaList.length ? (
            <MangaCard
              manga={mangaList[currentManga]}
              refreshMangaList={refreshMangaList}
            />
          ) : (
            <div className=" bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[300px] h-auto rounded-xl p-6 border ">
              <div className="animate-pulse space-y-6">
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                </div>
                <div className="bg-gray-200 dark:bg-neutral-800 h-[300px] rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-10">
                    <div className="h-2 bg-gray-200 dark:bg-neutral-800 rounded col-span-3"></div>
                    <div className="h-2 bg-gray-200 dark:bg-neutral-800 rounded col-span-1"></div>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-4 w-[80px] bg-gray-200 dark:bg-neutral-800 rounded col-span-1"></div>
                    <div className="h-4 w-[50px] bg-gray-200 dark:bg-neutral-800 rounded col-span-1"></div>
                    <div className="h-4 w-[60px] bg-gray-200 dark:bg-neutral-800 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                  <div className="h-2 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                  <div className="h-2 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-36">
                  <div className="h-5 bg-gray-200 dark:bg-neutral-800 rounded col-span-1"></div>
                  <div className="h-5 bg-gray-200 dark:bg-neutral-800 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={nextManga}
            disabled={currentManga === mangaList.length - 1}
            className="mt-64 disabled:opacity-50 bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-4 border right-7 sm:right-0 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MangaList;

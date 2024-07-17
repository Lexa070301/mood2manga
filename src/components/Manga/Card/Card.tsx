"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";
import { motion } from "framer-motion";

export interface Manga {
  mal_id: number;
  title: string;
  url: string;
  synopsis: string;
  score: string;
  image: string;
  date: string;
  genres: string[];
}

interface Props {
  manga: Manga;
  refreshMangaList: () => void;
}

export const MangaCard: React.FC<Props> = ({ manga, refreshMangaList }) => {
  const updateHiddenManga = (val: number[]) => {
    localStorage.setItem("hiddenManga", JSON.stringify(val));
    refreshMangaList();
  };

  const hideManga = () => {
    const hiddenManga = localStorage.getItem("hiddenManga");
    if (hiddenManga) {
      const hiddenMangaList = JSON.parse(hiddenManga);
      hiddenMangaList.push(manga.mal_id);
      updateHiddenManga(hiddenMangaList);
    } else {
      updateHiddenManga([manga.mal_id]);
    }
  };
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto w-[300px] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {manga.title}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-5">
          <Image
            src={manga.image}
            height="1000"
            width="1000"
            className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-5">
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-xs max-w-sm dark:text-neutral-300"
          >
            {manga.date}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm dark:text-neutral-300"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              {manga.score}
            </div>
          </CardItem>
        </div>
        <CardItem as="div" translateZ="70" className="w-full mt-3">
          {manga.genres.map((genre, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-md bg-gray-200 dark:bg-neutral-800 px-2 py-1 mr-1 mb-1 text-xs font-medium text-gray-600 dark:text-gray-200 ring-1 ring-inset ring-gray-500/10"
            >
              {genre}
            </span>
          ))}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-3 dark:text-neutral-300"
        >
          {manga.synopsis}
        </CardItem>
        <div className="flex justify-between items-center mt-7">
          <CardItem
            translateZ={20}
            as="button"
            onClick={hideManga}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Hide
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            href={manga.url}
            target="__blank"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Link
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

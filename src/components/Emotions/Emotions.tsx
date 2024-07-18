"use client";

import React from "react";
import Link from "next/link";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import EmotionCard from "@/components/Emotions/Card/Card";
import { emotions } from "@/dataset";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const Emotions: React.FC = () => {
  const title = [
    {
      text: "Find",
    },
    {
      text: "your",
    },
    {
      text: "manga",
    },
    {
      text: "with",
    },
    {
      text: "Mood2Manga",
      className: "text-green-500 dark:text-green-500",
    },
  ];
  return (
    <div className="flex items-center flex-col w-full">
      <Header mood="" />
      <h1 className="font-bold text-neutral-600 dark:text-white pt-4">
        <TypewriterEffectSmooth words={title} />
      </h1>
      <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-6">
        {emotions.map((emotion, index) => (
          <Link href={`/${emotion.emotion}`} key={index}>
            <EmotionCard text={emotion.emotion} />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Emotions;

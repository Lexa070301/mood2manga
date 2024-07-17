"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { EmotionCard } from "@/components/Emotions/Card/Card";
import { emotions } from "@/dataset";

const Emotions: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {emotions.map((emotion, index) => (
          <Link href={`/${emotion.emotion}`} key={index}>
            <EmotionCard text={emotion.emotion} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Emotions;

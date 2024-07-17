"use client";

import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

interface Props {
  text: string;
}

export const EmotionCard: React.FC<Props> = ({ text }) => {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-1 sm:p-2 md:p-3 lg:p-4 relative h-[100px] sm:h-[150px] md:h-[200px] lg:h-[300px] cursor-pointer">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={text} />
    </div>
  );
};

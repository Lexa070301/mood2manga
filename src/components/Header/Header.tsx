import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/logo/logo.svg";

interface Props {
  mood: string;
}

const Header: React.FC<Props> = ({ mood }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[500px] h-auto rounded-xl p-6 border">
      <Link href="/">
        <Image
          priority
          src={Logo}
          alt="Follow us on Twitter"
          width={50}
          height={50}
        />
      </Link>

      {mood ? (
        <span className="text-md sm:text-xl font-bold text-neutral-600 dark:text-white">
          Feeling{" "}
          <span className="bg-gradient-to-r from-green-500 to-blue-700 text-white rounded-md ml-1 py-1 px-2">
            {mood}
          </span>
        </span>
      ) : (
        <span className="text-md sm:text-xl font-bold text-neutral-600 dark:text-white">
          Mood2Manga
        </span>
      )}
      <div className="hidden sm:block invisible">back</div>
    </div>
  );
};

export default Header;

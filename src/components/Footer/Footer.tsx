import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LinkPreview } from "@/components/ui/link-preview";

import Avatar from "@/assets/icons/me.jpg";

const Footer: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[500px] h-auto rounded-xl p-6 border z-10">
      <div className="flex items-center">
        <span className="mr-3">Created by:</span>
        <LinkPreview
          url="https://github.com/Lexa070301"
          className="flex items-center mr-2 font-bold"
        >
          <Image
            priority
            src={Avatar}
            alt="Follow us on Twitter"
            width={30}
            height={30}
            className="rounded-full mr-1"
          />
          <span className="text-sm">Alexey Perfilev</span>
        </LinkPreview>
      </div>
    </div>
  );
};

export default Footer;

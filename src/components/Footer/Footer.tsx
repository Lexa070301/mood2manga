import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LinkPreview } from "@/components/ui/link-preview";

import Avatar from "@/assets/icons/me.jpg";

const Footer: React.FC = () => {
  const [productHuntSrc, setProductHuntSrc] = useState(
    "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=473166&theme=neutral"
  );

  useEffect(() => {
    const src =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=473166&theme=dark"
        : "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=473166&theme=light";
    setProductHuntSrc(src);
  }, []);
  return (
    <div className="flex items-center justify-center bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[550px] h-auto rounded-xl p-6 border z-10">
      <div className="flex items-center justify-between w-full flex-col sm:flex-row">
        <span className="mr-3">Created by:</span>
        <LinkPreview
          url="https://github.com/Lexa070301"
          className="flex items-center my-3 sm:my-0 sm:mr-auto font-bold"
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
        <LinkPreview url="https://www.producthunt.com/posts/mood2manga?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mood2manga">
          <img
            src={productHuntSrc}
            alt="Mood2Manga - Find&#0032;the&#0032;best&#0032;manga&#0032;to&#0032;suit&#0032;your&#0032;mood | Product Hunt"
            width="250"
            height="54"
          />
        </LinkPreview>
      </div>
    </div>
  );
};

export default Footer;

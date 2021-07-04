import Image from "next/image";
import React from "react";

interface CoverImageProps {
  nsfw: boolean;
  url: string;
  title: string;
}

export const CoverImage = ({ nsfw, url, title }: CoverImageProps) => {
  return (
    <div id="cf2" className="relative  h-80 w-52" style={{ margin: "0 auto" }}>
      <Image className="absolute" src={url} alt={title} layout="fill" />
      {nsfw && (
        <Image
          className="absolute z-0 hover:opacity-0 cursor-pointer transition-opacity duration-500"
          src="/nsfw_warning.jpg"
          layout="fill"
          alt="nsfw placeholder"
        />
      )}
    </div>
  );
};

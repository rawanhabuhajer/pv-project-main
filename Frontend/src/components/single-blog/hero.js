import React from "react";
import Image from "next/future/image";
import { handleImageLink } from "@/helpers/functions";
const hero = ({ singleBlog }) => {
  return (
    <div className="hero-wrapper">
      <Image
        src={handleImageLink(singleBlog?.imageUrl)}
        className="hero-img"
        width={1000}
        height={1000}
        alt="hero"
      />
    </div>
  );
};

export default hero;

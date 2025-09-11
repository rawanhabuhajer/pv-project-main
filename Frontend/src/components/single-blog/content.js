import React from "react";
import DateIcon from "./assets/date.svg";
import Person from "./assets/Person.svg";
import { getFullDate } from "@/helpers/functions";
import { useRouter } from "next/router";

const content = ({ singleBlog }) => {
  const { locale } = useRouter();

  return (
    <>
      <div className="content-wrapper">
        <div className="icons-wrapper">
          <div className="icons">
            <DateIcon />
            <p>{getFullDate(singleBlog?.date, locale)}</p>
          </div>
          <div className="icons">
            <Person />
            <p>{singleBlog?.author}</p>
          </div>
        </div>
        <h3 className="blog-title">{singleBlog?.title}</h3>

        <div
          className="content-article"
          dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
        />
      </div>
    </>
  );
};

export default content;

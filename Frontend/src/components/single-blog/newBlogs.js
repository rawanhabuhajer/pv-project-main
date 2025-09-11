import React from "react";
import Image from "next/future/image";
import DateIcon from "./assets/date2.svg";
import { getFullDate, handleImageLink } from "@/helpers/functions";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const newBlogs = ({ blogs }) => {
  const { locale, query } = useRouter();
  const slug = query?.slug;

  const renderBlogs = blogs?.map((article, index) => {
    if (article?.slug !== slug) {
      return (
        <div className="section" key={index}>
          <div className="img-container">
            <Image
              src={handleImageLink(article?.image)}
              width={85}
              height={85}
              alt=""
            />
            <Link href={`/blogs/${article?.slug}`}>
              <a></a>
            </Link>
          </div>
          <div className="info-container">
            <div className="date-container">
              <DateIcon />
              <p>{getFullDate(article?.date, locale)}</p>
            </div>
            <h4>
              <Link href={`/blogs/${article?.slug}`}>
                <a title={article?.title}>{article?.title}</a>
              </Link>
            </h4>
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <div className="newBlogs-wrapper">
        <div className="title">
          <h2>
            <FormattedMessage id="latestBlogs" />
          </h2>
        </div>

        {blogs?.length > 1 ? (
          renderBlogs
        ) : (
          <div className="alert alert-warning text-center">
            <FormattedMessage id="noBlogs" />
          </div>
        )}
      </div>
    </>
  );
};

export default newBlogs;

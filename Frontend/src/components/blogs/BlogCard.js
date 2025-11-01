import { getFullDate, handleImageLink } from "@/helpers/functions";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import CalendarIcon from "./assets/date.svg";
import UserIcon from "./assets/user.svg";
import { FormattedMessage } from "react-intl";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <div className="blog-image">
        <Image
          src={handleImageLink(blog?.imageUrl)}
          alt={blog?.title}
          width={400}
          height={400}
        />
        <Link href={`/blogs/${blog?._id}`}>
          <a> </a>
        </Link>
      </div>
      <div className="blog-content">
        <ul>
          <li>
            <CalendarIcon fill="#000" />
            {getFullDate(blog?.createdAt)}
          </li>
          <li title={blog?.author}>
            <UserIcon fill="#000" />
            {blog?.author?.slice(0, 20) +
              (blog?.author?.length > 20 ? "..." : "")}
          </li>
        </ul>

        <h2>
          <Link href={`/blogs/${blog?._id}`}>
            <a>{blog?.title}</a>
          </Link>
        </h2>

        <div
          className="blog-desc"
          dangerouslySetInnerHTML={{
            __html: blog?.content,
          }}
        />
        <Link href={`/blogs/${blog?._id}`}>
          <a className="btn">
            <FormattedMessage id="readMore" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

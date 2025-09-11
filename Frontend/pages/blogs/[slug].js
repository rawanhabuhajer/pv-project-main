import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCmsFooter,
  getSingleBlog,
  getAllBlogs,
  getBlogCategories,
} from "@/store/actions";
import { useSelector } from "react-redux";

const SingleBlogSection = dynamic(
  () => import("@/components/single-blog/Index"),
  {
    ssr: false,
  }
);

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const SingleBlog = () => {
  const { singleBlog } = useSelector((state) => state.blogs);

  return (
    <>
      <NextSeo
        title={singleBlog?.title}
        description={singleBlog?.metaDescription}
        openGraph={{
          title: singleBlog?.metaTitle,
          description: singleBlog?.metaDescription,
          images: [
            {
              url: singleBlog?.image,
              width: 800,
              height: 600,
              alt: singleBlog?.title,
            },
          ],
        }}
        canonical={singleBlog?.canonicalTag}
      />
      <Header />
      <SingleBlogSection />
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // false or 'blocking'
  };
}

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params, ctx }) => {
    const { slug } = params;

    store.dispatch(
      getSingleBlog({
        cookies: {},
        slug,
      })
    );

    store.dispatch(
      getCmsFooter({
        cookies: {},
        lang: ctx?.locale || "ar",
      })
    );

    store.dispatch(
      getAllBlogs({
        cookies: {},
        lang: ctx?.locale || "ar",
      })
    );

    store.dispatch(
      getBlogCategories({
        cookies: {},
      })
    );

    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default SingleBlog;

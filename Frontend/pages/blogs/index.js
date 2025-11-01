import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import { getAllBlogs } from "@/store/actions";

const Blog = dynamic(() => import("@/components/blogs/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const Blogs = () => {
  return (
    <>
      <NextSeo title={"blogs"} description={"blogsSeo?.description"} />
      <Blog />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    store.dispatch(
      getAllBlogs({
        cookies: {},
      })
    );

    // store.dispatch(
    //   getBlogCategories({
    //     cookies: {},
    //   })
    // );

    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default Blogs;

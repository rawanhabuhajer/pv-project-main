import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCmsFooter,
  getAllCmsHome,
  getAllSeo,
  getAllBlogs,
  getBlogCategories,
} from "@/store/actions";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";

const Blog = dynamic(() => import("@/components/blogs/Index"), {
  ssr: false,
});

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const Blogs = () => {
  return (
    <>
      <NextSeo title={"blogs"} description={"blogsSeo?.description"} />
      <Header />
      <Blog />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async (ctx) => {
    // store.dispatch(
    //   getAllBlogs({
    //     cookies: {},
    //     lang: ctx?.locale || "ar",
    //   })
    // );

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

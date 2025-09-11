import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/components/home/index"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <NextSeo title={"pv xperts"} description={"pv xperts"} />

      <HomePage />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async (ctx) => {
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default Home;

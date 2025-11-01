import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";

import dynamic from "next/dynamic";
import { getAllCmsHome } from "../src/store/authentication/actions";

const HomePage = dynamic(() => import("@/components/home/index"), {
  ssr: true,
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
  return async () => {
    let allCmsHomeData = [];

    // Dispatch action with callback to capture data
    store.dispatch(
      getAllCmsHome({ cookies: {} }, (err, data) => {
        if (!err && data) {
          allCmsHomeData = data;
        }
      })
    );

    store.dispatch(END); // Signal saga to finish
    await store.sagaTask.toPromise(); // Wait for saga completion

    console.log("Server fetched CMS Home:", allCmsHomeData);

    return {
      props: {
        allCmsHome: allCmsHomeData,
      },
      revalidate: 1,
    };
  };
});
export default Home;

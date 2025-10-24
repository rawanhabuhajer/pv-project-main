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

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // dispatch action لتحميل الـ CMS sections
  store.dispatch(
    getAllCmsHome({
      cookies: {},
      lang: "en",
    })
  );

  // إنهاء كل sagas والانتظار حتى تنتهي
  store.dispatch(END);
  await store.sagaTask.toPromise();

  return {
    props: {}, // لا حاجة لتمرير البيانات يدوياً، لأنها في الـ store
    revalidate: 1,
  };
});

export default Home;

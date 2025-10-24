import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getAllCmsHome } from "@/store/actions";

import dynamic from "next/dynamic";


const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const PrivacySection = dynamic(() => import("@/components/privacy/Index"), {
  ssr: false,
});

const PrivacyPolicy = () => {
  return (
    <>
      <NextSeo
        title={"privacySeo?.title"}
        description={"privacySeo?.description"}
      />

      <PrivacySection />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(
    getAllCmsHome({
      cookies: {},
      lang: "en",
    })
  );

  store.dispatch(END);
  await store.sagaTask.toPromise();

  return {
    props: {},
    revalidate: 60,
  };
});

export default PrivacyPolicy;

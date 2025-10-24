import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getAllCmsHome } from "@/store/actions";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const TermsSection = dynamic(() => import("@/components/terms/Index"), {
  ssr: false,
});

const PrivacyPolicy = () => {
  return (
    <>
      <NextSeo
        title={"termsSeo?.title"}
        description={"termsSeo?.description"}
      />
      <Header />
      <TermsSection />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
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
      revalidate: 1,
    };
  };
});

export default PrivacyPolicy;

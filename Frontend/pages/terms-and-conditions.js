import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getAllCmsHome, getCmsFooter, getAllSeo } from "@/store/actions";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";

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
  const { allCmsSeo } = useSelector((state) => state.cms);
  const termsSeo = getSectionData(allCmsSeo, "terms-and-conditions");

  return (
    <>
      <NextSeo title={termsSeo?.title} description={termsSeo?.description} />
      <Header />
      <TermsSection />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async (ctx) => {
    store.dispatch(
      getAllCmsHome({
        cookies: {},
        lang: ctx?.locale || "ar",
      })
    );
    store.dispatch(
      getCmsFooter({
        cookies: {},
        lang: ctx?.locale || "ar",
      })
    );
    store.dispatch(
      getAllSeo({
        cookies: {},
        lang: ctx?.locale || "ar",
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

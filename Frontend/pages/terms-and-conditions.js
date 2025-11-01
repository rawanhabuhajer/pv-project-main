import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getAllCmsHome } from "@/store/actions";

import dynamic from "next/dynamic";

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
      })
    );

    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 60,
    };
  };
});

export default PrivacyPolicy;

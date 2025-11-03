import React from "react";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getAllCmsHome, getCmsFooter, getAllSeo } from "@/store/actions";
import { useSelector } from "react-redux";
import { NextSeo } from "next-seo";
import { getSectionData } from "@/helpers/functions";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const ThankYouSection = dynamic(() => import("@/components/thank-you/Index"), {
  ssr: false,
});

const Thankyou = () => {
  return (
    <>
      <NextSeo title={"Thank you"} description={"thankYouSeo?.description"} />{" "}
      <div className="reset-wrapper-main">
        <Header />
        <ThankYouSection />
        <Footer />
      </div>
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

export default Thankyou;

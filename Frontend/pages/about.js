import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getCmsFooter, getAllCmsHome, getAllSeo } from "@/store/actions";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";

import dynamic from "next/dynamic";

const AboutUsSection = dynamic(() => import("@/components/about/Index"), {
  ssr: false,
});

const Header = dynamic(() => import("@/components/header/Index"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const AboutUs = () => {
  return (
    <>
      <NextSeo title={"about us"} description={"aboutSeo?.description"} />
      <Header />
      <AboutUsSection />
      <Footer />
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

export default AboutUs;

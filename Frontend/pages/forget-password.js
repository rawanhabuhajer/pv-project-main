import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getCmsFooter, getAllCmsHome, getAllSeo } from "@/store/actions";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";

import dynamic from "next/dynamic";

const ForgetPasswordSection = dynamic(
  () => import("@/components/forget-password/Index"),
  {
    ssr: false,
  }
);

const ForgetPassword = () => {
  // const { allCmsSeo } = useSelector((state) => state.cms);
  // const forgetSeo = getSectionData(allCmsSeo, "forget-password");

  return (
    <>
      <NextSeo title={"forget-password"} description={"g"} />

      <ForgetPasswordSection />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async (ctx) => {
    // store.dispatch(
    //   getAllCmsHome({
    //     cookies: {},
    //     lang: ctx?.locale || "ar",
    //   })
    // );
    // store.dispatch(
    //   getCmsFooter({
    //     cookies: {},
    //     lang: ctx?.locale || "ar",
    //   })
    // );
    // store.dispatch(
    //   getAllSeo({
    //     cookies: {},
    //     lang: ctx?.locale || "ar",
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

export default ForgetPassword;

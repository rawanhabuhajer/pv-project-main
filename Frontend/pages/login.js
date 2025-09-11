import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";
import dynamic from "next/dynamic";

const LoginSection = dynamic(() => import("@/components/login/Index"), {
  ssr: false,
});

const Login = () => {
  // const { allCmsSeo } = useSelector((state) => state.cms);
  // const loginSeo = getSectionData(allCmsSeo, "login");

  return (
    <>
      <NextSeo title={"loginSeo?.title"} description={"loginSeo?.description"} />

      <LoginSection />
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

export default Login;

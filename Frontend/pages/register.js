import React, { useEffect } from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";

import {


} from "@/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { parseCookies } from "nookies";
import { getSectionData } from "@/helpers/functions";

const RegisterSection = dynamic(() => import("@/components/register2/Index"), {
  ssr: false,
});
import dynamic from "next/dynamic";

const Register = () => {
  const dispatch = useDispatch();
  const cookies = parseCookies();

  return (
    <>
      <NextSeo
        title={"registerSeo?.title"}
        description={"registerSeo?.description"}
      />

      <RegisterSection />
      {/* <RegisterSection2 /> */}
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

export default Register;

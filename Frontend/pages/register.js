import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";

const RegisterSection = dynamic(() => import("@/components/register2/Index"), {
  ssr: true,
});
import dynamic from "next/dynamic";

const Register = () => {
  return (
    <>
      <NextSeo
        title={"registerSeo?.title"}
        description={"registerSeo?.description"}
      />

      <RegisterSection />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async () => {
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default Register;

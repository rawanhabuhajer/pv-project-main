import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import { getCmsFooter, getAllCmsHome, getAllSeo } from "@/store/actions";
import { useSelector } from "react-redux";
import { getSectionData } from "@/helpers/functions";

import dynamic from "next/dynamic";
const ResetPasswordSection = dynamic(
  () => import("@/components/reset-password/Index"),
  {
    ssr: false,
  }
);

const resetPassword = () => {
  // const { allCmsSeo } = useSelector((state) => state.cms);
  // const resetSeo = getSectionData(allCmsSeo, "reset-password");

  return (
    <>
      <NextSeo
        title={"resetSeo?.title"}
        description={"resetSeo?.description"}
      />

      <ResetPasswordSection />
    </>
  );
};
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // false or 'blocking'
  };
}

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async ({ params, ctx }) => {
    // const { slug } = params;

    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {},
      revalidate: 1,
    };
  };
});

export default resetPassword;

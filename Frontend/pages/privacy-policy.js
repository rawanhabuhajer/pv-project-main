import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { getAllCmsHome } from "@/store/actions";

import dynamic from "next/dynamic";


const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});

const PrivacySection = dynamic(() => import("@/components/privacy/Index"), {
  ssr: false,
});

const PrivacyPolicy = () => {
  return (
    <>
      <NextSeo
        title={"privacySeo?.title"}
        description={"privacySeo?.description"}
      />

      <PrivacySection />
      <Footer />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // dispatch action لتحميل الـ CMS sections
  store.dispatch(
    getAllCmsHome({
      cookies: {},
  
    })
  );

  // إنهاء كل sagas والانتظار حتى تنتهي
  store.dispatch(END);
  await store.sagaTask.toPromise();

  return {
    props: {}, // لا حاجة لتمرير البيانات يدوياً، لأنها في الـ store
    revalidate: 1,
  };
});


export default PrivacyPolicy;

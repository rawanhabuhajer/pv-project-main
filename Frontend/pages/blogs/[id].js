import React from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../../src/store";
import { END } from "redux-saga";
import dynamic from "next/dynamic";
import {
  getCmsFooter,
  getSingleBlog,
  getAllBlogs,
  getBlogCategories,
} from "@/store/actions";
import { useSelector } from "react-redux";

const SingleBlogSection = dynamic(
  () => import("@/components/single-blog/Index"),
  {
    ssr: false,
  }
);

const Footer = dynamic(() => import("@/components/footer/Index"), {
  ssr: false,
});



const SingleBlog = () => {
  const { singleBlog } = useSelector((state) => state.blogs);

  return (
    <>
      <NextSeo
        title={"singleBlog?.title"}
        description={"singleBlog?.metaDescription"}
        openGraph={{
          title: "singleBlog?.metaTitle",
          description: "singleBlog?.metaDescription",
          // images: [
          //   {
          //     url: singleBlog?.image,
          //     width: 800,
          //     height: 600,
          //     alt: singleBlog?.title,
          //   },
          // ],
        }}
        canonical={"singleBlog?.canonicalTag"}
      />

      <SingleBlogSection />
      <Footer />
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
    const { id } = params;

    store.dispatch(getSingleBlog({ cookies: {}, id }));
    store.dispatch(getAllBlogs({ cookies: {} }));

    store.dispatch(END);
    await store.sagaTask.toPromise();

    // Sanitize any Error objects to prevent serialization issues
    const state = store.getState();
    if (state.blogs?.error instanceof Error) {
      state.blogs.error = state.blogs.error.message;
    }

    return {
      props: { initialState: state },
      revalidate: 1,
    };
  };
});

export default SingleBlog;

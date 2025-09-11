import React, { useEffect } from "react";
import { NextSeo } from "next-seo";
import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import ErrorImage from "../src/assets/images/404.png";
import { parseCookies } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import {
  getTenders,

} from "@/store/actions";
import toast from "react-hot-toast";
import { getSectionData } from "@/helpers/functions";
import Image from "next/future/image";
import Logo from "../src/assets/images/logo.svg";
import Link from "next/link";
import AccountSection from "@/components/account/Index";
;

const Account = () => {
  const cookies = parseCookies();
  const dispatch = useDispatch();
  const router = useRouter();
  const { account } = router.query;
  const { user } = useSelector((state) => state.authentication);;

  useEffect(() => {
    if (account.length === 2 && account[1] === "my-tenders") {
      dispatch(
        getTenders({
          pageNumber: 1,
          pageSize: 10,
          cookies,
          toast,
        })
      );
    }
  }, [dispatch, account, user]);

  return (
    <>
      <NextSeo
        title={"PVX360"}
        description={"accountSeo?.description"}
      />

      {router.asPath.includes("/account") ? (
        <AccountSection />
      ) : (
        <div className="not-found">
          <div className="header">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
          <div className="wrapper">
            <div>
              <h1>OOPS!</h1>
              <h2>ERROR 404</h2>
            </div>
            <Image src={ErrorImage} />
          </div>
        </div>
      )}
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps = wrapper.getStaticProps((store) => {
  return async (ctx) => {
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

    return { props: {}, revalidate: 1 };
  };
});

export default Account;

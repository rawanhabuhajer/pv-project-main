import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import toast, { Toaster } from "react-hot-toast";
import TopBarProgress from "react-topbar-progress-indicator";
import SSRProvider from "react-bootstrap/SSRProvider";
import AOS from "aos";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "aos/dist/aos.css";
import "swiper/css";
import "../styles/main.scss";

const languages = {
  ar: require("@/content/languages/ar.json"),
  en: require("@/content/languages/en.json"),
};

import { wrapper } from "../src/store";
import { END } from "redux-saga";
import { parseCookies } from "nookies";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/store/actions";
import Loading from "@/components/Shared/Loading";

function MyApp({ Component, pageProps }) {
  const cookies = parseCookies();
  const dispatch = useDispatch();
  const router = useRouter();
  const { locale, defaultLocale } = useRouter();
  const messages = languages[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";

  const [Progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.authentication);

  TopBarProgress.config({
    barThickness: 3,
    barColors: {
      0: "#e9e0f1ff",
      0.5: "#a855f7",
      1.0: "#3b82f6",
    },
  });

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", () => {
      setProgress(true);
      handleStart();
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(false);
      handleComplete();
    });
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "mobile",
    });
    document.documentElement.dir = dir;
    document.body.style.direction = dir;
    document.body.setAttribute("dir", dir);
  }, [dir]);

  // Check if user not logged in and try to access dashboard page
  useEffect(() => {
    if (!cookies.token && router.asPath.includes("/account")) {
      router.push("/");
    }
  }, [cookies.token, router.asPath]);

  useEffect(() => {
    if (cookies.token) {
      dispatch(getUserProfile({ cookies, toast }));
    }
  }, [dispatch, cookies.token]);

  useEffect(() => {
    if (user && user?.modules) {
      // Extract the slug from the URL
      const currentPathArray = router.asPath.split("/");
      const slug = currentPathArray.length > 2 ? currentPathArray[2] : "";

      // Get all module slugs from the user
      const userModuleSlugs = user.modules.map((module) => module.slug);

      // Check if the current slug is in the allowed slugs list but not in the user's modules
      if (allowedSlugs.includes(slug) && !userModuleSlugs.includes(slug)) {
        router.push("/");
      }
    }
  }, [user, router.asPath]);

  return (
    <>
      <Head>
        <title>PV xperts</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      {Progress && <TopBarProgress />}
      {loading && <Loading loading={loading} />}
      <SSRProvider>
        <IntlProvider
          messages={messages}
          defaultLocale={defaultLocale}
          locale={locale}
        >
          <div className="wrap">
            <Component {...pageProps} />
            <Toaster position="top-left" reverseOrder={false} />
          </div>
        </IntlProvider>
      </SSRProvider>
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async () => {
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return {};
});

export default wrapper.withRedux(MyApp);

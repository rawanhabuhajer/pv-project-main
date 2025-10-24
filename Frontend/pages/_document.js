import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (
      <Html lang={locale} dir={dir}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#111827" />
          <meta name="msapplication-navbutton-color" content="#111827" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#111827"
          />
          <meta name="author" content="Pv xperts" />
          <meta name="keywords" content="" />
          <meta
            name="google-site-verification"
            content="uZ6732LHZ_wFC75KLAiVbEUKM82GSiys3gfy4RHdOeY"
          />

          {/* Social Media Meta Tags */}
          <link rel="canonical" href="http://pvxperts.com/" />
          <meta property="og:locale" content="ar_AR" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="" />
          <meta property="og:description" content="" />
          <meta property="og:url" content="http://pvxperts.com" />
          <meta property="og:site_name" content="" />
          <meta property="og:image" content="" />
          <meta property="og:image:secure_url" content="" />
          <meta property="og:image:width" content="360" />
          <meta property="og:image:height" content="361" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content="" />
          <meta name="twitter:title" content="" />
          <meta name="twitter:site" content="@pvxperts" />
          <meta name="twitter:image" content="" />
          <meta name="twitter:creator" content="@pvxperts" />
          <meta name="robots" content="noodp,noydir" />

          {/* Facebook Pixel Code */}
          <meta
            name="facebook-domain-verification"
            content="7edwi0zgwevg4t9k8y9k6xnkirsbtu"
          />

          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=757427626457943&ev=PageView&noscript=1"
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

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
          <meta name="theme-color" content="#095183" />
          <meta name="msapplication-navbutton-color" content="#095183" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#095183"
          />
          <meta name="author" content="Pv xperts" />
          <meta name="keywords" content="" />
          <meta
            name="google-site-verification"
            content="uZ6732LHZ_wFC75KLAiVbEUKM82GSiys3gfy4RHdOeY"
          />

          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-BC2X86E0Q2"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-BC2X86E0Q2');`,
            }}
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
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '757427626457943');
              fbq('track', 'PageView');`,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=757427626457943&ev=PageView&noscript=1"
            />
          </noscript>

          {/* Hotjar Tracking Code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:4995281,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
            }}
          />
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

import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Lato } from "next/font/google";
import Layout from "@/components/Layout";
import { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import img from "../../public/defaultFeaturedImage.png";
import { FontContextProvider } from "@/components/FontProvider";

const lato = Lato({
  weight: ["300", "400", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    page: ReactElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageProps?: Record<string, any>
  ) => ReactNode;
  getSubLayout?: (
    page: ReactElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageProps?: Record<string, any>
  ) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getSubLayout = Component.getSubLayout ?? ((page) => page);
  const [currentTitle, setCurrentTitle] = useState("");

  const router = useRouter();

  useEffect(() => {
    setCurrentTitle(document.title);
  }, [router.asPath]);

  return (
    <>
      <Head>
        <meta property="og:title" content={currentTitle} />
        <meta
          property="og:description"
          content="Our mission is to empower investors by aligning their financial decisions with their spiritual values and in fostering a community where faith and finance intersect harmoniously."
        />
        <meta property="og:image" content={img.src} />
      </Head>
      <div className={lato.className}>
        <FontContextProvider value={{ fontClassName: lato.className }}>
          {getLayout(
            <Layout>
              {getSubLayout(<Component {...pageProps} />, pageProps)}
            </Layout>,
            pageProps
          )}
          <ToastContainer position="bottom-left" />
        </FontContextProvider>
      </div>
    </>
  );
}

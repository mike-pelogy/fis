import React, { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Lato } from "next/font/google";
import Layout from "@/components/Layout";
import { NextPage } from "next";

const lato = Lato({
  weight: ["300", "400", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  getSubLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getSubLayout = Component.getSubLayout ?? ((page) => page);

  return (
    <div className={lato.className}>
      {getLayout(<Layout>{getSubLayout(<Component {...pageProps} />)}</Layout>)}
    </div>
  );
}

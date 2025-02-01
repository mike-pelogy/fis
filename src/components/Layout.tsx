import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="flex relative z-0 flex-col items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}

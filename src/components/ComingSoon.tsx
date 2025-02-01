import React from "react";
import FunBackground from "./FunBackground";
import WhiteContainer from "./WhiteContainer";
import Logo from "./Logo";

export default function ComingSoon() {
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div className="w-full h-full absolute left-0 bottom-0 bg-fis-blue/10 z-[0]">
        <FunBackground />
      </div>
      <div className="container w-full md:w-1/2">
        <WhiteContainer>
          <section className="container w-full p-fis-2">
            <div className="flex justify-center w-full mb-fis-2">
              <Logo />
            </div>
            <h1 className="text-3xl text-fis-blue text-center w-full mb-4">
              Site is undergoing maintenance
            </h1>
            <p className="text-center w-full">
              Site will be available soon. Thank you for your patience!
            </p>
          </section>
        </WhiteContainer>
      </div>
    </section>
  );
}

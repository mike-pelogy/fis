import buildPageTitle from "@/utils/buildPageTitle";
import Head from "next/head";

export default function PrivacyPolicy() {
  const title = "Privacy Policy";

  return (
    <>
      <Head>
        <title>{buildPageTitle(title)}</title>
      </Head>
      <div className="flex w-full justify-center px-4 md:px-fis-1 py-fis-2">
        <section className="max-w-[768px] w-full">
          <h1 className="mb-4 text-3xl text-fis-blue">{title}</h1>
          <p>privacy policy</p>
        </section>
      </div>
    </>
  );
}

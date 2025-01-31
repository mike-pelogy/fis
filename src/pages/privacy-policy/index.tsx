import buildPageTitle from "@/utils/buildPageTitle";
import Head from "next/head";
import { fancyBulletPoints } from "../about";
import classNames from "classnames";
import getGqlRequest from "@/data/getGqlRequest";
import { privacyPageQuery } from "@/data/privacyPageQuery";
import { Page } from "@/gql/graphql";

const radialBg =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--blue)/0.2)_0%,rgba(256,256,256,1)_60%)]";

export async function getStaticProps() {
  const { data } = await getGqlRequest(privacyPageQuery);

  return {
    props: {
      data: data.page,
    },
  };
}

export default function PrivacyPolicy({ data }: { data: Page }) {
  return (
    <>
      <Head>
        <title>{buildPageTitle(data.title || "")}</title>
      </Head>
      <div
        className={classNames(
          radialBg,
          "flex w-full justify-center px-4 md:px-fis-1 py-fis-2"
        )}
      >
        <section className="max-w-[768px] w-full">
          <h1 className="mb-4 text-3xl text-fis-blue">{data.title}</h1>
          <span
            className={fancyBulletPoints}
            dangerouslySetInnerHTML={{ __html: data.content || "" }}
          />
        </section>
      </div>
    </>
  );
}

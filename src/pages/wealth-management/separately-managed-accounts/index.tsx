import { NextPageWithLayout } from "@/pages/_app";
import type { ReactElement } from "react";
import { Nav } from "../individuals/financial-planning";
import WhiteContainer from "@/components/WhiteContainer";
import FunBackground from "@/components/FunBackground";
import TextField from "@/components/Forms/TextField";
import Button from "@/components/Button";
import getGqlRequest from "@/data/getGqlRequest";
import { separatelyManageAccountsPageQuery } from "@/data/separatelyManageAccountsPageQuery";
import { Page_Separatelymanagedaccountssma } from "@/gql/graphql";
import { fancyBulletPoints } from "@/pages/about";
import { handleSubmit } from "@/utils/submitForm";
import Image from "next/image";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";
import { fancyNumberList } from "@/components/ETF";
import classNames from "classnames";

export async function getStaticProps() {
  const { data } = await getGqlRequest(separatelyManageAccountsPageQuery);

  return {
    props: {
      data: data.page.separatelyManagedAccountsSma,
    },
  };
}

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--blue)/0.15)_0%,rgba(256,256,256,1)_50%)]";

const AccessFISForm = () => {
  return (
    <form
      name="separatelyManagedAccounts"
      onSubmit={handleSubmit()}
      data-netlify
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value="separatelyManagedAccounts" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <TextField name="firstName" label="First Name:" />
        </div>
        <div className="w-full md:w-1/2">
          <TextField name="lastName" label="Last Name:" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <TextField name="email" label="Email:" type="email" />
        </div>
        <div className="w-full md:w-1/2">
          <TextField name="subject" label="Subject:" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <TextField
            name="message"
            label="Comment or Message:"
            type="textarea"
          />
        </div>
      </div>
      <div className="flex justify-end mt-fis-1">
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

const EndowmentsPage: NextPageWithLayout<{
  data: Page_Separatelymanagedaccountssma;
}> = ({ data }) => {
  const {
    top5Reasons,
    howToAccessFisForSmas,
    dueDiligence,
    dueDiligenceForFinancialAdvisors,
  } = data;

  return (
    <>
      <Head>
        <title>{buildPageTitle("Separately Managed Accounts (SMA)")}</title>
      </Head>
      <section className="w-full pt-fis-1 pb-fis-2 flex justify-center bg-slate-100">
        <div className="container px-4 md:px-0 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-fis-2">
            <div
              className="text-2xl text-fis-blue mb-4"
              dangerouslySetInnerHTML={{ __html: top5Reasons?.title || "" }}
            />
            <div
              className={classNames(fancyNumberList, "mb-fis-2")}
              dangerouslySetInnerHTML={{
                __html: top5Reasons?.reasons || "",
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: top5Reasons?.reasonsCopy || "",
              }}
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-fis-2 md:pr-fis-3 mt-fis-2 md:mt-0">
            <Image
              src={top5Reasons?.image?.mediaItemUrl || ''}
              alt={top5Reasons?.image?.altText || ''}
              width={1500}
              height={1500}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      <section className="w-full pt-fis-1 pb-fis-2 flex justify-center ">
        <div className="container flex px-4 md:px-0 flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/2 mt-fis-2 md:mt-0">
            <Image
              src={dueDiligenceForFinancialAdvisors?.image?.mediaItemUrl || ''}
              alt={dueDiligenceForFinancialAdvisors?.image?.altText || ''}
              width={1500}
              height={1500}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-fis-2">
            <div
              className="text-2xl text-fis-blue mb-4"
              dangerouslySetInnerHTML={{
                __html: dueDiligenceForFinancialAdvisors?.title || "",
              }}
            />
            <div
              className={fancyBulletPoints}
              dangerouslySetInnerHTML={{
                __html: dueDiligenceForFinancialAdvisors?.description || "",
              }}
            />
          </div>
        </div>
      </section>
      <section className="w-full py-fis-2 flex justify-center bg-slate-100">
        <div className="container px-4 md:px-0 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
            <div
              className="text-2xl text-fis-blue mb-4"
              dangerouslySetInnerHTML={{ __html: dueDiligence?.title || "" }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: dueDiligence?.description || "",
              }}
            />
            <div
              className="text-3xl text-fis-purple font-bold mt-4"
              dangerouslySetInnerHTML={{
                __html: dueDiligence?.quote || "",
              }}
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-fis-2 mt-fis-2 md:mt-0">
            <div
              dangerouslySetInnerHTML={{
                __html: dueDiligence?.descriptionMore || "",
              }}
            />
          </div>
        </div>
      </section>
      <div className="flex justify-center relative w-full pt-fis-2 pb-fis-2 bg-slate-100">
        <div className="w-full h-[calc(100%-120px)] absolute left-0 bottom-0 bg-fis-blue/10 z-[0]">
          <FunBackground />
        </div>
        <div className="container w-full">
          <WhiteContainer>
            <section className="flex container w-full flex-col md:flex-row px-0 md:px-fis-1">
              <div className="w-full md:w-1/2 pr-0 md:pr-fis-1">
                <div
                  className="text-2xl text-fis-blue mb-4"
                  dangerouslySetInnerHTML={{
                    __html: howToAccessFisForSmas?.title || "",
                  }}
                />
                <div
                  className={fancyBulletPoints}
                  dangerouslySetInnerHTML={{
                    __html: howToAccessFisForSmas?.description || "",
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 mt-fis-2 md:mt-0">
                <div className="pl-0 md:pl-fis-1">
                  <AccessFISForm />
                </div>
              </div>
            </section>
          </WhiteContainer>
        </div>
      </div>
    </>
  );
};

const subLayout = (page: ReactElement) => {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div className="pt-fis-1 w-full bg-slate-100" />
      <div className="w-full bg-slate-100 flex justify-center sticky top-[79px] md:top-[100px] z-[1000]">
        <div className="container w-full">
          <Nav />
        </div>
      </div>
      <div className="pb-fis-1 w-full bg-slate-100" />
      <div className="w-full flex flex-col items-center">{page}</div>
    </div>
  );
};

EndowmentsPage.getSubLayout = subLayout;

export default EndowmentsPage;

import Button from "@/components/Button";
import ETF from "@/components/ETF";
import FunBackground from "@/components/FunBackground";
import WhiteContainer from "@/components/WhiteContainer";
import { API } from "@/constants";
import { kocgPageQuery } from "@/data/kocgPageQuery";
import {
  Page_Kocg,
  Page_Kocg_Landing,
  Page_Kocg_Quote,
  Page_Kocg_Values,
} from "@/gql/graphql";
import { NextPageWithLayout } from "@/pages/_app";
import request from "graphql-request";
import { ReactElement } from "react";

export async function getStaticProps() {
  const data = await request(API, kocgPageQuery);

  return {
    props: {
      data: data.page.kocg,
      title: data.page.title,
    },
  };
}

const Landing = ({
  landing,
  title,
}: {
  landing: Page_Kocg_Landing;
  title: string;
}) => {
  return (
    <div className="bg-slate-50 w-full py-fis-2 flex justify-center">
      <section className="container flex items-center">
        <div className="w-1/2 pr-fis-2">
          <h1 className="text-5xl mb-8">{title}</h1>
          <h3 className="text-fis-blue text-2xl">
            FIS Knights of Columbus Global Belief ETF
          </h3>
          <hr className="mt-4 mb-6" />
          <span
            className="[&>p:text-lg]"
            dangerouslySetInnerHTML={{ __html: landing.description as string }}
          />
          <div className="flex justify-end mt-8">
            <Button variant="primary" href={landing.cta?.url as string}>
              {landing.cta?.title}
            </Button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="w-full aspect-video bg-slate-500 rounded-lg" />
        </div>
      </section>
    </div>
  );
};

const Values = ({ values }: { values: Page_Kocg_Values }) => {
  return (
    <div className="flex justify-center relative w-full pt-fis-2">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
        <FunBackground />
      </div>
      <div className="container w-full">
        <WhiteContainer>
          <div className="flex">
            <div className="w-1/2 pr-fis-2">
              <div className="w-full aspect-video bg-slate-500 rounded-lg" />
            </div>
            <div className="w-1/2">
              <div
                className="[&>p:text-lg]"
                dangerouslySetInnerHTML={{
                  __html: values.description as string,
                }}
              />
              <div className="flex items-center my-8">
                <div className="mr-8">
                  <div className="w-[168px] h-[60px] bg-slate-500 rounded-lg" />
                </div>
                <Button variant="primary" href={values.moreInfo?.url as string}>
                  {values.moreInfo?.title}
                </Button>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: values.investmentPolicy as string,
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: values.guidelines as string,
                }}
              />
            </div>
          </div>
        </WhiteContainer>
      </div>
    </div>
  );
};

const Quote = ({ quote }: { quote: Page_Kocg_Quote }) => {
  return (
    <div className="bg-slate-50 w-full pt-fis-2 flex justify-center">
      <section className="container flex justify-center">
        <div className="pb-fis-2 pr-fis-2 max-w-[630px]">
          <p className="text-2xl text-fis-purple" dangerouslySetInnerHTML={{ __html: quote.quote as string }} />
          <div className="flex items-center gap-8 mt-8">
            <div>
              <div className="w-[168px] h-[60px] bg-slate-500 rounded-lg" />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: quote.description as string }}
            />
          </div>
        </div>
        <div>
          <div className="w-[325px] h-[400px] bg-slate-500 rounded-t-lg" />
        </div>
      </section>
    </div>
  );
};

const KocgPage: NextPageWithLayout = ({
  data,
  title,
}: {
  data: Page_Kocg;
  title: string;
}) => {
  return (
    <>
      {data.landing && title && (
        <Landing landing={data.landing} title={title} />
      )}
      {data.values && <Values values={data.values} />}
      {data.quote && <Quote quote={data.quote} />}
      {data.overview &&
        data.pricing &&
        data.performance &&
        data.distributions &&
        data.distributionsCopy &&
        data.documents &&
        data.dataReference && (
          <ETF
            overview={data.overview}
            pricing={data.pricing}
            performance={data.performance}
            distributions={data.distributions}
            holdings={data.distributionsCopy}
            documents={data.documents}
            dataReference={data.dataReference}
          />
        )}
    </>
  );
};

KocgPage.getLayout = (page: ReactElement) => {
  return (
    <>
      {page}
      <div>the footer below teh footer</div>
    </>
  );
};

export default KocgPage;

import Button from "@/components/Button";
import ETF from "@/components/ETF";
import getGqlRequest from "@/data/getGqlRequest";
import { prayPageQuery } from "@/data/prayPageQuery";
import {
  Page_Kocg_Documents,
  Page_Kocg_Holdings,
  Page_Kocg_Overview,
  Page_Kocg_Performance,
  Page_Kocg_Pricing,
  Page_Pray,
  Page_Pray_Landing,
} from "@/gql/graphql";
import { NextPageWithLayout } from "@/pages/_app";
import ArrowRight from "@/svgs/ArrowRight";
import { ReactElement } from "react";

export async function getStaticProps() {
  const { data } = await getGqlRequest(prayPageQuery);

  return {
    props: {
      data: data.page.pray,
      title: data.page.title,
    },
  };
}

const Landing = ({
  landing,
  title,
}: {
  landing: Page_Pray_Landing;
  title: string;
}) => {
  return (
    <div className="bg-slate-50 w-full py-fis-2 flex justify-center px-4 md:px-0">
      <section className="container flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 md:pr-fis-2 pr-0">
          <h1 className="text-3xl md:text-5xl mb-8">{title}</h1>
          <h3 className="text-fis-blue text-2xl">FIS Christian Stock Fund</h3>
          <hr className="mt-4 mb-6" />
          <span
            dangerouslySetInnerHTML={{ __html: landing.description as string }}
          />
          <Button
            variant="primary"
            href={landing.cta?.url as string}
            IconButton={<ArrowRight />}
          >
            {landing.cta?.title}
          </Button>
        </div>
        <div className="w-full md:w-1/2 mt-fis-2 md:mt-0">
          <div className="w-full aspect-video bg-slate-500 rounded-lg" />
        </div>
      </section>
    </div>
  );
};

const PrayPage: NextPageWithLayout<{
  data: Page_Pray;
  title: string;
}> = ({ data, title }) => {
  console.log(data);
  return (
    <>
      {data.landing && title && (
        <Landing landing={data.landing} title={title} />
      )}
      {data.overview &&
        data.pricing &&
        data.performance &&
        data.distributions &&
        data.distributionsCopy &&
        data.documents && (
          <ETF
            overview={data.overview as Page_Kocg_Overview}
            pricing={data.pricing as Page_Kocg_Pricing}
            performance={data.performance as Page_Kocg_Performance}
            distributions={data.distributions}
            holdings={data.distributionsCopy as Page_Kocg_Holdings}
            documents={data.documents as Page_Kocg_Documents}
            dataReference={{}}
          />
        )}
    </>
  );
};

PrayPage.getLayout = (page: ReactElement) => {
  return (
    <>
      {page}
      <div>the footer below teh footer</div>
    </>
  );
};

export default PrayPage;

import Button from "@/components/Button";
import ETF from "@/components/ETF";
import { API } from "@/constants";
import { prayPageQuery } from "@/data/prayPageQuery";
import {
  Page_Kocg_Overview,
  Page_Pray,
  Page_Pray_Landing,
} from "@/gql/graphql";
import { NextPageWithLayout } from "@/pages/_app";
import request from "graphql-request";

export async function getStaticProps() {
  const data = await request(API, prayPageQuery);
  console.log(data);

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
    <div className="bg-slate-50 w-full py-fis-2 flex justify-center">
      <section className="container flex items-center">
        <div className="w-1/2 pr-fis-2">
          <h1 className="text-5xl mb-8">{title}</h1>
          <h3 className="text-fis-blue text-2xl">FIS Christian Stock Fund</h3>
          <hr className="mt-4 mb-6" />
          <span
            dangerouslySetInnerHTML={{ __html: landing.description as string }}
          />
          <Button variant="primary" href={landing.cta?.url as string}>
            {landing.cta?.title}
          </Button>
        </div>
        <div className="w-1/2">
          <div className="w-full aspect-video bg-slate-500 rounded-lg" />
        </div>
      </section>
    </div>
  );
};

const PrayPage: NextPageWithLayout = ({
  data,
  title,
}: {
  data: Page_Pray;
  title: string;
}) => {
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
            overview={data.overview}
            pricing={data.pricing}
            performance={data.performance}
            distributions={data.distributions}
            holdings={data.distributionsCopy}
            documents={data.documents}
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

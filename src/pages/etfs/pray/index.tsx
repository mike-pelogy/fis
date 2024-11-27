import Button from "@/components/Button";
import ETF from "@/components/ETF";
import { API } from "@/constants";
import { prayPageQuery } from "@/data/prayPageQuery";
import { Page_Kocg_Overview, Page_Pray, Page_Pray_Landing } from "@/gql/graphql";
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
    <section>
      <div>
        <h1>{title}</h1>
        <span
          dangerouslySetInnerHTML={{ __html: landing.description as string }}
        />
        <Button variant="primary" href={landing.cta?.url as string}>
          {landing.cta?.title}
        </Button>
      </div>
      <div>video</div>
    </section>
  );
};

const PrayPage: NextPageWithLayout = ({
  data,
  title,
}: {
  data: Page_Pray;
  title: string;
}) => {
  console.log(data)
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

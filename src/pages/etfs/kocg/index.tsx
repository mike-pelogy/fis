import Button from "@/components/Button";
import ETF from "@/components/ETF";
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

const Values = ({ values }: { values: Page_Kocg_Values }) => {
  return (
    <section>
      <div>video</div>
      <div>
        <span
          dangerouslySetInnerHTML={{ __html: values.description as string }}
        />
        <div>
          <div>image</div>
          <Button variant="primary" href={values.moreInfo?.url as string}>
            {values.moreInfo?.title}
          </Button>
        </div>
        <span
          dangerouslySetInnerHTML={{
            __html: values.investmentPolicy as string,
          }}
        />
        <span
          dangerouslySetInnerHTML={{ __html: values.guidelines as string }}
        />
      </div>
    </section>
  );
};

const Quote = ({ quote }: { quote: Page_Kocg_Quote }) => {
  return (
    <section>
      <div>
        <span dangerouslySetInnerHTML={{ __html: quote.quote as string }} />
        <div>
          <div>image</div>
          <span
            dangerouslySetInnerHTML={{ __html: quote.description as string }}
          />
        </div>
      </div>
      <div>image</div>
    </section>
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
        data.documents && data.dataReference && (
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

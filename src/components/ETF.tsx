import Button from "@/components/Button";
import useFetch from "@/data/useFetch";
import {
  MediaItem,
  Page_Kocg_DataReference,
  Page_Kocg_Documents,
  Page_Kocg_Holdings,
  Page_Kocg_Overview,
  Page_Kocg_Performance,
  Page_Kocg_Pricing,
} from "@/gql/graphql";
import { useEffect } from "react";

type SectionTypes =
  | "Overview"
  | "Pricing"
  | "Performance"
  | "Distributions"
  | "Holdings"
  | "Documents";

const navBar: { title: SectionTypes }[] = [
  { title: "Overview" },
  { title: "Pricing" },
  { title: "Performance" },
  { title: "Distributions" },
  { title: "Holdings" },
  { title: "Documents" },
];

const NavBar = () => (
  <div>
    <ul>
      {navBar.map(({ title }) => (
        <li key={title}>
          <a href={`#${title}`}>{title}</a>
        </li>
      ))}
    </ul>
  </div>
);

const Overview = ({
  overview,
  id,
  daily,
}: {
  overview: Page_Kocg_Overview;
  id: SectionTypes;
  daily: MediaItem;
}) => {
  const { data, error } = useFetch(daily.mediaItemUrl || "");

  useEffect(() => {
    if(error) {
      console.error(error);
    }
  }, [error]);

  // TODO: use data for dynamic table
  console.log(data);

  return (
    <section id={id}>
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: overview.title as string }} />
        <span
          dangerouslySetInnerHTML={{ __html: overview.description as string }}
        />
        <span
          dangerouslySetInnerHTML={{
            __html: overview.investmentObjectives as string,
          }}
        />
      </div>
      <div>
        <div>
          <div>
            <p>Funding Details</p>
            <p>As of DATE</p>
          </div>
          {[
            { title: "Fund Inception", value: "7/14/2021" },
            { title: "Fund Ticker", value: "KOCG" },
          ].map(({ title, value }) => {
            return (
              <div key={title}>
                <p>{title}</p>
                <p>{value}</p>
              </div>
            );
          })}
        </div>
        <div>
          <h4 dangerouslySetInnerHTML={{ __html: overview.title as string }} />
          {overview?.fundResources?.map((f) => {
            return (
              <Button
                key={f?.file?.mediaItemUrl as string}
                href={f?.file?.mediaItemUrl as string}
                variant="neutral"
              >
                {f?.title}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const SimpleDataTable = ({
  title,
  labelValues,
}: {
  title: string;
  labelValues: { label: string; value: string }[];
}) => {
  return (
    <div>
      <h4>{title}</h4>
      {labelValues.map(({ label, value }) => {
        return (
          <div key={label}>
            <div>{label}</div>
            <div>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

const Pricing = ({
  pricing,
  id,
}: {
  pricing: Page_Kocg_Pricing;
  id: SectionTypes;
}) => {
  return (
    <section id={id}>
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: pricing.title as string }} />
        <span>data as of</span>
      </div>
      <div>
        <div>
          <SimpleDataTable
            title="Closing NAV Price"
            labelValues={[{ label: "Net Asset Value", value: "$27.45" }]}
          />
        </div>
        <div>
          <SimpleDataTable
            title="Closing Market Price"
            labelValues={[{ label: "Net Asset Value", value: "$27.45" }]}
          />
        </div>
        <div>
          <SimpleDataTable
            title="Premium / Discount"
            labelValues={[{ label: "Net Asset Value", value: "$27.45" }]}
          />
          <Button
            href={pricing.premiumOrDiscountInfo?.url as string}
            variant="secondary"
          >
            {pricing.premiumOrDiscountInfo?.title}
          </Button>
        </div>
      </div>
    </section>
  );
};

const Performance = ({
  performance,
  id,
  monthly,
  quarterly,
}: {
  performance: Page_Kocg_Performance;
  id: SectionTypes;
  monthly: MediaItem;
  quarterly: MediaItem;
}) => {
  const { data: monthlyData, error: monthlyError } = useFetch(
    monthly.mediaItemUrl || ""
  );
  const { data: quarterlyData, error: quarterlyError } = useFetch(
    quarterly.mediaItemUrl || ""
  );

  useEffect(() => {
    if(monthlyData) {
      console.error(monthlyError);
    }
    if(quarterlyError) {
      console.error(quarterlyError);
    }
  }, [monthlyError, quarterlyError]);

  // TODO: use data for dynamic table
  console.log(monthlyData, quarterlyData);

  return (
    <section id={id}>
      <div>
        <div>Monthly Performance</div>
        <div>Quarterly Performance</div>
      </div>
      <div>
        <span
          dangerouslySetInnerHTML={{
            __html: performance.monthlyDisclaimer as string,
          }}
        />
      </div>
      <div>
        <span
          dangerouslySetInnerHTML={{
            __html: performance.quarterlyDisclaimer as string,
          }}
        />
      </div>
    </section>
  );
};

const Distributions = ({
  distributions,
  id,
}: {
  distributions: string;
  id: SectionTypes;
}) => {
  return (
    <section id={id}>
      <h3>{distributions}</h3>
      <div>
        <div>
          <SimpleDataTable
            title="As of DATE"
            labelValues={[{ label: "30 Day SEC Yeild", value: "1.56%" }]}
          />
        </div>
        <div>
          <h4>As of DATE</h4>
          {[
            { title: "Ex-Div Date", value: "12/29/2022" },
            { title: "Record Date", value: "12/29/2022" },
            { title: "Payable Date", value: "12/29/2022" },
            { title: "Amount ($)", value: "12/29/2022" },
          ].map(({ title, value }) => (
            <SimpleDataTable
              key={title}
              title={title}
              labelValues={[{ label: "", value }]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Holdings = ({
  holdings,
  id,
  top10,
}: {
  holdings: Page_Kocg_Holdings;
  id: SectionTypes;
  top10: MediaItem;
}) => {
  const { data, error } = useFetch(top10.mediaItemUrl || "");

  useEffect(() => {
    if(error) {
      console.error(error);
    }
  }, [error]);

  // TODO: use data for dynamic table
  console.log(data);
  return (
    <section id={id}>
      <div>
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: holdings.title as string }} />
          <span>data as of</span>
        </div>
        <Button href={holdings.download?.url as string} variant="neutral">
          {holdings.download?.title}
        </Button>
      </div>
      <div>
        {[
          { name: "", ticker: "Ticker", weight: "Weighting (%)" },
          { name: "Microsoft Corp", ticker: "MSFT", weight: "4.88%" },
          { name: "Nvidia Corp", ticker: "NVDA", weight: "4.65%" },
        ].map(({ name, ticker, weight }) => (
          <div key={ticker}>
            <div>{name}</div>
            <div>{ticker}</div>
            <div>{weight}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Documents = ({
  documents,
  id,
}: {
  documents: Page_Kocg_Documents;
  id: SectionTypes;
}) => {
  return (
    <section id={id}>
      <div>
        <h3>Legal Documents & Reports</h3>
        {documents?.legal?.map((f) => {
          return (
            <Button
              key={f?.file?.mediaItemUrl as string}
              href={f?.file?.mediaItemUrl as string}
              variant="neutral"
            >
              {f?.title || f?.file?.title}
            </Button>
          );
        })}
      </div>
      <div>
        <h3>Fund Resources</h3>
        {documents?.fundResources?.map((f) => {
          return (
            <Button
              key={f?.file?.mediaItemUrl as string}
              href={f?.file?.mediaItemUrl as string}
              variant="neutral"
            >
              {f?.title || f?.file?.title}
            </Button>
          );
        })}
      </div>
    </section>
  );
};

export default function ETF({
  overview,
  pricing,
  performance,
  distributions,
  holdings,
  documents,
  dataReference,
}: {
  overview: Page_Kocg_Overview;
  pricing: Page_Kocg_Pricing;
  performance: Page_Kocg_Performance;
  distributions: string;
  holdings: Page_Kocg_Holdings;
  documents: Page_Kocg_Documents;
  dataReference: Page_Kocg_DataReference;
}) {
  return (
    <>
      <NavBar />
      {dataReference.daily && (
        <Overview
          overview={overview}
          id="Overview"
          daily={dataReference.daily}
        />
      )}
      <hr />
      <Pricing pricing={pricing} id="Pricing" />
      {dataReference.monthly && dataReference.quarterly && (
        <Performance
          performance={performance}
          id="Performance"
          monthly={dataReference.monthly}
          quarterly={dataReference.quarterly}
        />
      )}
      <Distributions distributions={distributions} id="Distributions" />
      {dataReference.top10Holdings && (
        <Holdings
          holdings={holdings}
          id="Holdings"
          top10={dataReference.top10Holdings}
        />
      )}
      <Documents documents={documents} id="Documents" />
    </>
  );
}

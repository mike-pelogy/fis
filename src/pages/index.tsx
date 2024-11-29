import Button from "@/components/Button";
import ConnectWithUs from "@/components/ConnectWithUs";
import FunBackground from "@/components/FunBackground";
import { API } from "@/constants";
import { homePageQuery } from "@/data/homePageQuery";
import type {
  Page_Homepage,
  Page_Homepage_AboutSection,
  Page_Homepage_Landing,
  Page_Homepage_LatestNewAndInsights,
  Page_Homepage_Services,
} from "@/gql/graphql";
import request from "graphql-request";

export async function getStaticProps() {
  const data = await request(API, homePageQuery);

  return {
    props: {
      data: data.page.homepage as Page_Homepage,
    },
  };
}

const LandingAndAbout = ({
  landing,
  aboutSection,
}: {
  landing: Page_Homepage_Landing;
  aboutSection: Page_Homepage_AboutSection;
}) => {
  return (
    <div className="flex flex-col items-center relative w-full">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
        <FunBackground />
      </div>
      <div className="relative z-100">
        <section className="container flex py-[60px]">
          <div className="w-1/2 flex flex-col gap-6 items-start">
            <h1
              className="[&>p]:text-5xl [&>p]:leading-[1.1] [&>p]:font-bold [&>p>strong:first-child]:text-fis-purple [&>p>strong]:text-fis-blue"
              dangerouslySetInnerHTML={{ __html: landing.title as string }}
            />
            <span
              className="max-w-[420px] [&>p]:text-xl"
              dangerouslySetInnerHTML={{
                __html: landing.description as string,
              }}
            />
            <Button
              variant="primary"
              href={landing.callToAction?.url as string}
            >
              {landing.callToAction?.title}
            </Button>
          </div>
          <div className="w-1/2 pl-[60px]">image</div>
        </section>
        <section className="container rounded-lg bg-slate-50 flex">
          <div className="w-1/2">image</div>
          <div className="p-[60px] w-1/2">
            <h2
              className="text-fis-blue text-2xl"
              dangerouslySetInnerHTML={{ __html: aboutSection.title as string }}
            />
            <hr className="mt-4 mb-8" />
            <span
              className="[&>p]:text-base"
              dangerouslySetInnerHTML={{
                __html: aboutSection.description as string,
              }}
            />
            <div className="flex justify-end mt-8">
              <Button
                variant="secondary"
                href={aboutSection.callToAction?.url as string}
              >
                {aboutSection.callToAction?.title}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Services = ({ services }: { services: Page_Homepage_Services }) => {
  return (
    <div className="container">
      <section>
        <h3 dangerouslySetInnerHTML={{ __html: services.title as string }} />
        <div>
          <h1
            dangerouslySetInnerHTML={{
              __html: services.wealthManagement?.title as string,
            }}
          />
          <span
            dangerouslySetInnerHTML={{
              __html: services.wealthManagement?.description as string,
            }}
          />
          <div>
            {services.wealthManagement?.services?.map((service) => {
              return (
                <div key={service?.title}>
                  <h4
                    dangerouslySetInnerHTML={{
                      __html: service?.title as string,
                    }}
                  />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: service?.description as string,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <Button
            variant="primary"
            href={services.wealthManagement?.callToAction?.url as string}
          >
            {services.wealthManagement?.callToAction?.title}
          </Button>
        </div>
        <div>image</div>
      </section>
      <section>
        <div>image</div>
        <div>
          <h2
            dangerouslySetInnerHTML={{
              __html: services.investment?.title as string,
            }}
          />
          <span
            dangerouslySetInnerHTML={{
              __html: services.investment?.description as string,
            }}
          />
          <Button
            variant="primary"
            href={services.investment?.callToAction?.url as string}
          >
            {services.investment?.callToAction?.title}
          </Button>
        </div>
      </section>
    </div>
  );
};

const LatestNewAndHighlights = ({
  latestNewAndInsights,
}: {
  latestNewAndInsights: Page_Homepage_LatestNewAndInsights;
}) => {
  return (
    <div>
      <section>
        <div>
          <h1
            dangerouslySetInnerHTML={{
              __html: latestNewAndInsights.title as string,
            }}
          />
          <Button
            variant="neutral"
            href={latestNewAndInsights.link?.url as string}
          >
            {latestNewAndInsights.link?.title}
          </Button>
        </div>
        <div>posts</div>
      </section>
    </div>
  );
};

export default function HomePage({ data }: { data: Page_Homepage }) {
  return (
    <>
      {data.landing && data.aboutSection && (
        <LandingAndAbout
          landing={data.landing}
          aboutSection={data.aboutSection}
        />
      )}
      {data.services && <Services services={data.services} />}
      {data.latestNewAndInsights && (
        <LatestNewAndHighlights
          latestNewAndInsights={data.latestNewAndInsights}
        />
      )}
      {data.contactUsCtaSimple && (
        <ConnectWithUs connectWithUs={data.contactUsCtaSimple} />
      )}
    </>
  );
}

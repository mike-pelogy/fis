import Button from "@/components/Button";
import ConnectWithUs from "@/components/ConnectWithUs";
import FunBackground from "@/components/FunBackground";
import PostCard from "@/components/PostCard";
import WhiteContainer from "@/components/WhiteContainer";
import { API } from "@/constants";
import { homePageQuery } from "@/data/homePageQuery";
import type {
  Page_Homepage,
  Page_Homepage_AboutSection,
  Page_Homepage_Landing,
  Page_Homepage_LatestNewAndInsights,
  Page_Homepage_Services,
} from "@/gql/graphql";
import ArrowRight from "@/svgs/ArrowRight";
import request from "graphql-request";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { fancyBulletPoints } from "./about";

export async function getStaticProps() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await request(API, homePageQuery);

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
        <section className="container flex flex-col md:flex-row justify-center items-center py-fis-2 px-4 md:px-0 ">
          <div className="w-full md:w-1/2 flex flex-col gap-6 items-start">
            <h1
              className="[&>p]:text-3xl md:[&>p]:text-5xl [&>p]:leading-[1.1] [&>p]:font-bold [&>p>strong:first-child]:text-fis-purple [&>p>strong]:text-fis-blue"
              dangerouslySetInnerHTML={{ __html: landing.title as string }}
            />
            <span
              className="max-w-[420px] [&>p]:text-xl"
              dangerouslySetInnerHTML={{
                __html: landing.description as string,
              }}
            />
            <Button
              variant="white"
              href={landing.callToAction?.url as string}
              className="hover:!bg-slate-50/90"
              IconButton={<ArrowRight />}
            >
              {landing.callToAction?.title}
            </Button>
          </div>
          <div className="w-full md:w-1/2 pl-0 pt-fis-2 md:pt-0 md:pl-fis-2">
            <Image
              src="/Splash1.jpg"
              alt="nice"
              width={1500}
              height={1500}
              className="rounded-lg"
            />
          </div>
        </section>
        <section className="container rounded-lg overflow-hidden flex flex-col-reverse md:flex-row items-center relative before:content-[''] before:absolute before:w-full before:rounded-lg before:h-full before:bg-slate-100 before:opacity-95 before:left-0 before:right-0">
          <div className="w-full md:w-1/2 relative">
            <Image src="/HomeAbout.jpg" alt="nice" width={1500} height={1500} />
          </div>
          <div className="px-4 p-fis-2 md:p-fis-2 w-full md:w-1/2 relative">
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
    <div className="container py-fis-2 px-4 md:px-0">
      <section>
        <h2
          className="text-5xl font-bold mb-fis-2"
          dangerouslySetInnerHTML={{ __html: services.title as string }}
        />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
            <h3
              className="text-fis-blue text-2xl mb-6"
              dangerouslySetInnerHTML={{
                __html: services.wealthManagement?.title as string,
              }}
            />
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: services.wealthManagement?.description as string,
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pointer">
              {services.wealthManagement?.services?.map((service) => {
                return (
                  <div
                    className="rounded-lg bg-slate-50 p-4"
                    key={service?.title}
                  >
                    <h4
                      className="font-bold mb-2"
                      dangerouslySetInnerHTML={{
                        __html: service?.title as string,
                      }}
                    />
                    <span
                      className={fancyBulletPoints}
                      dangerouslySetInnerHTML={{
                        __html: service?.description as string,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-fis-1">
              <Button
                IconButton={<ArrowRight />}
                variant="primary"
                href={services.wealthManagement?.callToAction?.url as string}
              >
                {services.wealthManagement?.callToAction?.title}
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
            <div className="w-full aspect-video bg-slate-500 rounded-lg" />
          </div>
        </div>
      </section>
      <section className="pt-fis-2 flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
          <div className="w-full aspect-video bg-slate-500 rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 pl-0 md:pl-fis-2">
          <h3
            className="text-fis-blue text-2xl mb-6"
            dangerouslySetInnerHTML={{
              __html: services.investment?.title as string,
            }}
          />
          <span
            dangerouslySetInnerHTML={{
              __html: services.investment?.description as string,
            }}
          />
          <div className="flex justify-end mt-fis-1">
            <Button
              IconButton={<ArrowRight />}
              variant="primary"
              href={services.investment?.callToAction?.url as string}
            >
              {services.investment?.callToAction?.title}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const dummyPosts: {
  categories?: { label: string; path: string }[];
  img: string;
  title: string;
  date: string;
  url: string;
}[] = [
  {
    categories: [],
    img: "image",
    url: "/",
    title:
      "Whether you come to us with an existing portfolio, low-basis/concentrated positions, or with cash proceeds from a business sale or inheritance.",
    date: "Jul 04, 23",
  },
  {
    categories: [],
    img: "image",
    url: "/",
    title: "title",
    date: new Date().getDate().toString(),
  },
  {
    categories: [],
    img: "image",
    url: "/",
    title: "title",
    date: new Date().getDate().toString(),
  },
  {
    categories: [],
    img: "image",
    url: "/",
    title: "title",
    date: new Date().getDate().toString(),
  },
  {
    categories: [{ label: "Articles", path: "/" }],
    img: "image",
    url: "/",
    title: "title",
    date: new Date().getDate().toString(),
  },
];

function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth > 768);
    const updateSize = () => {
      setIsMobile(window.innerWidth > 768);
    };

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return isMobile;
}

const LatestNewAndHighlights = ({
  latestNewAndInsights,
}: {
  latestNewAndInsights: Page_Homepage_LatestNewAndInsights;
}) => {
  const isDesktop = useMediaQuery();

  const finalSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: isDesktop ? 3 : 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex justify-center relative w-full pt-fis-2">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
        <FunBackground />
      </div>
      <div className="container w-full">
        <WhiteContainer>
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-between">
            <h3
              className="text-fis-blue text-2xl"
              dangerouslySetInnerHTML={{
                __html: latestNewAndInsights.title as string,
              }}
            />
            <Button
              IconButton={<ArrowRight />}
              variant="neutral"
              href={latestNewAndInsights.link?.url as string}
            >
              {latestNewAndInsights.link?.title}
            </Button>
          </div>
          <hr className="mt-4 mb-6" />
          <div className="w-full relative">
            <Slider {...finalSettings}>
              {dummyPosts.map((post) => {
                return (
                  <div key={post.url} className="px-4">
                    <PostCard post={post} showButton showImage />
                  </div>
                );
              })}
            </Slider>
          </div>
        </WhiteContainer>
      </div>
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

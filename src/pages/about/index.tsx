import FunBackground from "@/components/FunBackground";
import { aboutPageQuery, teamQuery } from "@/data/aboutPageQuery";
import {
  Page_Aboutpage,
  Page_Aboutpage_About,
  Page_Aboutpage_Mission,
  Page_Aboutpage_Values,
  Team,
} from "@/gql/graphql";
import { TeamDetails } from "../team/[name]";
import Link from "next/link";
import classNames from "classnames";
import getGqlRequest from "@/data/getGqlRequest";
import Image from "next/image";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";

export const slugToImageMap: Record<string, string> = {
  'mike-skillman': '/MikeSkillman.jpg',
  'jay-peroni-cfp': '/JayPeroni.png',
  'steve-nelson-cfa': '/SteveNelson.png',
  'jason-kreke': '/JasonKreke.png',
}

export async function getStaticProps() {
  const { data } = await getGqlRequest(aboutPageQuery);
  const { data: teamData } = await getGqlRequest(teamQuery);

  // eslint-disable-next-line
  const team = teamData?.teams?.edges.map(({ node }: { node: any }) => node) as Team[] || [];

  const teamTemp = team.map((member) => {
    if(member.slug) {
      // @ts-ignore
      member.featuredImage = { node: { mediaItemUrl: slugToImageMap[member.slug] } };
    }

    return {
      ...member,
    }
  })

  return {
    props: {
      data: data.page.aboutPage as Page_Aboutpage,
      team: teamTemp,
    },
  };
}

export const fancyBulletPoints =
  '[&_li]:relative [&_li]:pl-[1.25rem] [&_ul]:space-y-1 [&_li]:before:content-[""] [&_li]:before:fb-tri [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.5em] [&_li]:before:bg-fis-purple [&_li]:before:block [&_li]:before:h-2 [&_li]:before:w-2';

const bg =
  "before:content-[''] before:absolute before:w-full before:h-full before:bg-slate-100 before:opacity-95 before:rounded-lg before:left-0 before:right-0";

const MissionAndValues = ({
  mission,
  values,
}: {
  mission: Page_Aboutpage_Mission;
  values: Page_Aboutpage_Values;
}) => {
  return (
    <div className="flex justify-center relative w-full pt-fis-2 pb-fis-2">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 bottom-0 bg-fis-blue/10 z-[-1]">
        <FunBackground />
      </div>
      <section className="container px-4 md:px-fis-2 relative">
        <div
          id="mission"
          className={classNames("overflow-hidden relative rounded-lg", bg)}
        >
          <div className="flex flex-col md:flex-row">
            <div className="flex relative flex-col w-full justify-center items-stretch md:w-1/2 px-4 p-fis-2 md:px-fis-2">
              <div>
                <h3
                  className="text-fis-blue text-2xl mb-4"
                  dangerouslySetInnerHTML={{ __html: mission.title as string }}
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: mission.description as string,
                  }}
                />
              </div>
              <hr className="my-fis-1 md:my-fis-2" id="values" />
              <div>
                <h3
                  className="text-fis-blue text-2xl mb-4"
                  dangerouslySetInnerHTML={{ __html: values.title as string }}
                />
                <span
                  className={classNames(
                    "[&_strong]:text-fis-purple",
                    fancyBulletPoints
                  )}
                  dangerouslySetInnerHTML={{
                    __html: values.description as string,
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2  relative">
              <Image
                src="/aboutPage.png"
                alt="Wealth Management"
                width={1200}
                height={1200}
                className="object-cover h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const TeamCard = (team: Team) => {
  const href = `/team/${team.slug}`;
  return (
    <article>
      <Link className="group" href={href}>
        <div className="pb-4">
        <div className="overflow-hidden max-w-[230px] aspect-square rounded-lg bg-slate-500">
          <Image
            src={
              team.featuredImage?.node.mediaItemUrl ||
              "/defaultFeaturedImage.png"
            }
            alt={team.title || ""}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <TeamDetails {...team} />
      </div>
    </article>
  );
};

const AboutOurTeam = ({
  about,
  team,
}: {
  about: Page_Aboutpage_About;
  team: Team[];
}) => {
  return (
    <div className="flex justify-center px-4 md:px-fis-3 py-fis-2" id="team">
      <section className="container flex flex-col">
        <div className="w-full md:w-1/2">
          <h3
            className="text-fis-blue text-2xl mb-4"
            dangerouslySetInnerHTML={{ __html: about.title as string }}
          />
          <span
            dangerouslySetInnerHTML={{ __html: about.description as string }}
          />
        </div>
        <div className="mt-fis-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-fis-2 gap-x-fis-1">
          {team.map((teamMember) => (
            <TeamCard key={teamMember.slug} {...teamMember} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default function AboutPage({
  data,
  team,
}: {
  data: Page_Aboutpage;
  team: Team[];
}) {
  return (
    <>
      <Head>
        <title>{buildPageTitle("About")}</title>
      </Head>
      {data.mission && data.values && (
        <MissionAndValues mission={data.mission} values={data.values} />
      )}
      {data.valuesCopy && <AboutOurTeam about={data.valuesCopy} team={team} />}
    </>
  );
}

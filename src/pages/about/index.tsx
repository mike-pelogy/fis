import FunBackground from "@/components/FunBackground";
import { API } from "@/constants";
import { aboutPageQuery } from "@/data/aboutPageQuery";
import {
  Page_Aboutpage,
  Page_Aboutpage_About,
  Page_Aboutpage_Mission,
  Page_Aboutpage_Values,
} from "@/gql/graphql";
import request from "graphql-request";
import { TeamDetails } from "../team/[name]";
import Link from "next/link";
import classNames from "classnames";

export async function getStaticProps() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data:any = await request(API, aboutPageQuery);

  return {
    props: {
      data: data.page.aboutPage as Page_Aboutpage,
    },
  };
}

export const fancyBulletPoints = '[&_li]:relative [&_li]:pl-[1.25rem] [&_ul]:space-y-1 [&_li]:before:content-[""] [&_li]:before:fb-tri [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.5em] [&_li]:before:bg-fis-purple [&_li]:before:block [&_li]:before:h-2 [&_li]:before:w-2';

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
            <div className="flex relative flex-col w-full md:w-1/2 px-4 p-fis-2 md:px-fis-2">
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
                className={classNames("[&_strong]:text-fis-purple", fancyBulletPoints)}
                  dangerouslySetInnerHTML={{
                    __html: values.description as string,
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full bg-slate-500 relative" />
          </div>
        </div>
      </section>
    </div>
  );
};

interface ITeamMember {
  img: string;
  role: string;
  name: string;
  phone: string;
  email: string;
  url: string;
}

const teamMembers: ITeamMember[] = [
  {
    img: "img",
    url: "img",
    name: "erik",
    role: "web development",
    phone: "23423423",
    email: "e.fadfadf@gmail.com",
  },
  {
    img: "img",
    url: "img",
    name: "erik",
    role: "web development",
    phone: "23423423",
    email: "e.fadfadf@gmail.com",
  },
  {
    img: "img",
    url: "img",
    name: "erik",
    role: "web development",
    phone: "23423423",
    email: "e.fadfadf@gmail.com",
  },
  {
    img: "img",
    url: "img",
    name: "erik",
    role: "web development",
    phone: "23423423",
    email: "e.fadfadf@gmail.com",
  },
];

const TeamCard = (team: ITeamMember) => {
  return (
    <article>
      <Link href={team.url}>
        <div className="pb-4">
          <div className="w-full max-w-[230px] aspect-square rounded-lg bg-slate-500" />
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <TeamDetails {...team} />
      </div>
    </article>
  );
};

const AboutOurTeam = ({ about }: { about: Page_Aboutpage_About }) => {
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
        <div className="mt-fis-1 grid grid-cols-1 md:grid-cols-3 gap-y-fis-2 gap-x-fis-1">
          {teamMembers.map((teamMember) => (
            <TeamCard key={teamMember.url} {...teamMember} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default function AboutPage({ data }: { data: Page_Aboutpage }) {
  return (
    <>
      {data.mission && data.values && (
        <MissionAndValues mission={data.mission} values={data.values} />
      )}
      {data.valuesCopy && <AboutOurTeam about={data.valuesCopy} />}
    </>
  );
}

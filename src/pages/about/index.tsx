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

export async function getStaticProps() {
  const data = await request(API, aboutPageQuery);

  return {
    props: {
      data: data.page.aboutPage as Page_Aboutpage,
    },
  };
}

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
      <section className="container px-fis-2 relative">
        <div className="overflow-hidden relative rounded-lg before:content-[''] before:absolute before:w-full before:h-full before:bg-slate-100 before:opacity-95 before:rounded-lg before:left-0 before:right-0">
          <div className="flex">
            <div className="flex relative flex-col w-1/2 p-fis-2">
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
              <hr className="my-fis-2" />
              <div>
                <h3
                  className="text-fis-blue text-2xl mb-4"
                  dangerouslySetInnerHTML={{ __html: values.title as string }}
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: values.description as string,
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 h-full bg-slate-500 relative" />
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
      <div className="mb-4">
        <div className="w-full max-w-[230px] aspect-square rounded-lg bg-slate-500" />
      </div>
      <div className="flex flex-col gap-2">
        <TeamDetails {...team} />
      </div>
    </article>
  );
};

const AboutOurTeam = ({ about }: { about: Page_Aboutpage_About }) => {
  return (
    <div className="flex justify-center px-fis-3 py-fis-2">
      <section className="container">
        <div className="w-1/2">
          <h3
            className="text-fis-blue text-2xl mb-4"
            dangerouslySetInnerHTML={{ __html: about.title as string }}
          />
          <span
            dangerouslySetInnerHTML={{ __html: about.description as string }}
          />
        </div>
        <div className="mt-fis-1 grid grid-cols-3 gap-y-fis-2 gap-x-fis-1">
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

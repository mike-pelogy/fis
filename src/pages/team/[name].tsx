import getGqlRequest from "@/data/getGqlRequest";
import { teamMemberQuery, teamsQuery } from "@/data/teamPageQuery";
import { Team } from "@/gql/graphql";
import Mail from "@/svgs/Mail";
import Phone from "@/svgs/Phone";
import buildPageTitle from "@/utils/buildPageTitle";
import classNames from "classnames";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { slugToImageMap } from "../about";

export const getStaticPaths = (async () => {
  const { data } = await getGqlRequest(teamsQuery);

  // eslint-disable-next-line
  const teamMembers = data.teams.edges.map(({ node }: { node: any }) => ({
    params: { name: node.slug },
  }));

  return {
    paths: teamMembers,
    fallback: false,
  };
}) satisfies GetStaticPaths;

// eslint-disable-next-line
export const getStaticProps: GetStaticProps<any, { name: string }> = async ({
  params,
}) => {
  const { name } = params || {};

  if (!name) {
    return { notFound: true };
  }

  const { data } = await getGqlRequest(teamMemberQuery, { slug: name });
  const teamBy: Team = data.teamBy;
  const { title, content: biography } = teamBy;

  const teamFinal = {
    ...teamBy,
  };

  teamFinal.featuredImage = {
    // @ts-expect-error make it work
    node: {
      mediaItemUrl: slugToImageMap[teamBy.slug as string],
    },
  };

  return {
    props: {
      name: title || "",
      biography,
      member: teamFinal,
    },
  };
};

const radialBg =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--purple)/0.2)_0%,rgba(256,256,256,1)_60%)]";

export const TeamDetails = ({ slug, title: name, teamMember }: Team) => {
  const { email, phone } = teamMember || {};
  const role = teamMember?.titles?.map((t) => t?.title).join(", ");
  const href = `/team/${slug}`;
  return (
    <>
      <Link className="group" href={href}>
        <h1 className="text-fis-blue group-hover:text-fis-purple transition-all text-lg font-bold">
          {name}
        </h1>
        <p className="text-base">{role}</p>
      </Link>
      <a
        href={`tel:${phone}`}
        className="text-fis-purple flex gap-2 hover:text-fis-blue transition-all"
      >
        <Phone />
        <span>{phone}</span>
      </a>
      <a
        href={`mailto:${email}`}
        className="text-fis-purple flex items-center gap-2 hover:text-fis-blue transition-all"
      >
        <Mail />
        <span>{email}</span>
      </a>
    </>
  );
};

export default function TeamMember({
  name,
  biography,
  member,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{buildPageTitle(name)}</title>
      </Head>
      <div className="flex justify-center w-full relative">
        <section className="container px-4 md:px-fis-2 p-fis-2 flex gap-fis-2 w-full flex-col md:flex-row relative">
          <div className="w-full md:w-1/2 flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3 max-w-[200px] md:max-w-full">
              <Image
                src={
                  member.featuredImage?.node.mediaItemUrl ||
                  "/defaultFeaturedImage.png"
                }
                alt={member}
                width={500}
                height={500}
                className="w-full object-cover max-w-[230px] aspect-square rounded-lg bg-slate-500"
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-2 align-start">
              <TeamDetails {...member} />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="min-h-[60vh]">
              <div
                className="max-w-[500px]"
                dangerouslySetInnerHTML={{ __html: biography }}
              />
            </div>
          </div>
        </section>
        <div
          className={classNames(
            "absolute w-2/3 aspect-video bottom-0 left-[50%] translate-x-[-50%] z-[-1]",
            radialBg
          )}
        />
      </div>
    </>
  );
}

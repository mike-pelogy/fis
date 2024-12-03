import Phone from "@/svgs/Phone";
import classNames from "classnames";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import Link from "next/link";

export const getStaticPaths = (async () => {
  // TODO: get all the team members from wordpress
  const teamMembers = [{ id: "mr-tester" }].map(({ id }) => ({
    params: { name: id },
  }));

  return {
    paths: teamMembers,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const { name } = params;

  return {
    props: {
      name,
      role: "role",
      phone: "543534554",
      email: "email@email.com",
      url: "url",
      biography:
        "aasdfasdvasdv alksdjvk lakjsvlkasdvas dvpas d0-v as90dv a90sdv90a s0d9va0isdhva9sdhva98s gdvo8asgdv7iasdi7vgaisdgofaudshufihqowihjf alksjdhf jkas dkfkasdjfhak jsdjkahsj asj jalsd jhas ad aasdfasdvasdv alksdjvk lakjsvlkasdvas dvpas d0-v as90dv a90sdv90a s0d9va0isdhva9sdhva98s gdvo8asgdv7iasdi7vgaisdgofaudshufihqowihjf alksjdhf jkas dkfkasdjfhak jsdjkahsj asj jalsd jhas adaasdfasdvasdv alksdjvk lakjsvlkasdvas dvpas d0-v as90dv a90sdv90a s0d9va0isdhva9sdhva98s gdvo8asgdv7iasdi7vgaisdgofaudshufihqowihjf alksjdhf jkas dkfkasdjfhak jsdjkahsj asj jalsd jhas adaasdfasdvasdv alksdjvk lakjsvlkasdvas dvpas d0-v as90dv a90sdv90a s0d9va0isdhva9sdhva98s gdvo8asgdv7iasdi7vgaisdgofaudshufihqowihjf alksjdhf jkas dkfkasdjfhak jsdjkahsj asj jalsd jhas adaasdfasdvasdv alksdjvk lakjsvlkasdvas dvpas d0-v as90dv a90sdv90a s0d9va0isdhva9sdhva98s gdvo8asgdv7iasdi7vgaisdgofaudshufihqowihjf alksjdhf jkas dkfkasdjfhak jsdjkahsj asj jalsd jhas adaasdfasdvasdv alksdjvk lakjsvlkasdvas dvpas d0-v as90dv a90sdv90a s0d9va0isdhva9sdhva98s gdvo8asgdv7iasdi7vgaisdgofaudshufihqowihjf alksjdhf jkas dkfkasdjfhak jsdjkahsj asj jalsd jhas adaasdfasdvasdv alksdjvk lakjsvlkasdvas dvpas d0-v as90dv a90sdv90a s0d9va0isdhva9sdhva98s gdvo8asgdv7iasdi7vgaisdgofaudshufihqowihjf alksjdhf jkas    dkfkasdjfhak jsdjkahsj asj jalsd jhas ad",
    },
  };
}) satisfies GetStaticProps<{
  name: string;
  role: string;
  email: string;
  phone: string;
  biography: string;
  url: string;
}>;

const radialBg =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--purple)/0.2)_0%,rgba(256,256,256,1)_60%)]";

export const TeamDetails = ({
  name,
  role,
  phone,
  email,
  url,
}: {
  name: string;
  role: string;
  phone: string;
  email: string;
  url: string;
}) => {
  return (
    <>
      <Link href={url}>
        <h1 className="text-fis-blue text-lg font-bold">{name}</h1>
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
        className="text-fis-purple flex gap-2 hover:text-fis-blue transition-all"
      >
        <span>{email}</span>
      </a>
    </>
  );
};

export default function TeamMember({
  name,
  role,
  email,
  phone,
  biography,
  url,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex justify-center w-full relative">
      <section className="container p-fis-2 flex w-full relative">
        <div className="w-1/2 flex">
          <div className="w-1/3 pr-4">
            <div className="w-full aspect-square bg-slate-500 rounded-lg" />
          </div>
          <div className="w-2/3 flex flex-col gap-2">
            <TeamDetails
              url={url}
              name={name}
              role={role}
              phone={phone}
              email={email}
            />
          </div>
        </div>
        <div className="w-1/2">{biography}</div>
      </section>
      <div
        className={classNames(
          "absolute w-2/3 aspect-video bottom-0 left-[50%] translate-x-[-50%] z-[-1]",
          radialBg
        )}
      />
    </div>
  );
}

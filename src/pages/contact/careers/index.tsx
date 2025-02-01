import Button from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import FileField from "@/components/Forms/FileField";
import TextField from "@/components/Forms/TextField";
import FunBackground from "@/components/FunBackground";
import WhiteContainer from "@/components/WhiteContainer";
import { navBar, SubscribeSection } from "..";
import getGqlRequest from "@/data/getGqlRequest";
import { handleSubmit } from "@/utils/submitForm";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";
import Image from "next/image";
import { careerPageQuery } from "@/data/careerPageQuery";
import {
  Page_Careerspage,
  ThemeGeneralSettings_Globaloptions,
} from "@/gql/graphql";
import { globalOptionsQuery } from "@/data/globalOptionsQuery";

export async function getStaticProps() {
  const { data } = await getGqlRequest(careerPageQuery);
  const { data: globalData } = await getGqlRequest(globalOptionsQuery);

  return {
    props: {
      data: data.page.careersPage as Page_Careerspage,
      globalData: globalData.themeGeneralSettings.globalOptions,
    },
  };
}

const CareerForm = () => {
  return (
    <form
      name="career"
      onSubmit={handleSubmit(true)}
      data-netlify="true"
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value="career" />
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/2">
          <TextField name="firstName" label="First Name:" />
        </div>
        <div className="w-full md:w-1/2">
          <TextField name="lastName" label="Last Name:" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/2">
          <TextField name="email" label="Email:" type="email" />
        </div>
        <div className="w-full md:w-1/2">
          <TextField name="company" label="Company:" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/2">
          <TextField name="state" label="State:" />
        </div>
        <div className="w-full md:w-1/2">
          <TextField name="phone" type="tel" label="Phone Number:" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full">
          <TextField
            name="message"
            label="Comment or Message:"
            type="textarea"
          />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/2">
          <FileField name="resume" label="Upload Resume:" required />
        </div>
        <div className="w-full md:w-1/2">
          <FileField name="cover" label="Upload Cover Letter:" />
        </div>
      </div>
      <div className="flex justify-end mt-fis-1">
        <Button variant="secondary" onClick={() => {}}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default function CareerPage({
  data,
  globalData,
}: {
  data: Page_Careerspage;
  globalData: ThemeGeneralSettings_Globaloptions;
}) {
  return (
    <>
      <Head>
        <title>{buildPageTitle("Careers")}</title>
      </Head>
      <div className="bg-slate-100 w-full pb-fis-2">
        <div className="flex justify-center relative w-full pt-fis-2">
          <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
            <FunBackground />
          </div>
          <div className="container w-full">
            <WhiteContainer>
              <div className="flex flex-col">
                <NavBar navBar={navBar} className="!pt-0" />
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 md:pr-fis-2 pr-0">
                    <div
                      className="mb-8"
                      dangerouslySetInnerHTML={{
                        __html: data.description || "",
                      }}
                    />
                    <CareerForm />
                  </div>
                  <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
                    <Image
                      src="/team.png"
                      width={1200}
                      height={800}
                      alt="team photo"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </WhiteContainer>
          </div>
        </div>
        {globalData.subscribe && (
          <SubscribeSection data={globalData.subscribe} />
        )}
      </div>
    </>
  );
}

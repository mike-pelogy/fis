import Button from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import FileField from "@/components/Forms/FileField";
import TextField from "@/components/Forms/TextField";
import FunBackground from "@/components/FunBackground";
import WhiteContainer from "@/components/WhiteContainer";
import { aboutPageQuery } from "@/data/aboutPageQuery";
import { Page_Aboutpage } from "@/gql/graphql";
import { navBar, SubscribeSection } from "..";
import getGqlRequest from "@/data/getGqlRequest";
import { handleSubmit } from "@/utils/submitForm";

export async function getStaticProps() {
  const { data } = await getGqlRequest(aboutPageQuery);

  return {
    props: {
      data: data.page.aboutPage as Page_Aboutpage,
    },
  };
}

const CareerForm = () => {
  return (
    <form
      name="career"
      onSubmit={handleSubmit}
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
          <FileField name="resume" label="Upload Resume:" />
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

export default function CareerPage() {
  return (
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
                  <p className="mb-4">
                    Interested in more information? Reach out and let’s explore
                    how we can support you.
                  </p>
                  <CareerForm />
                </div>
                <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
                  <div className="rounded-lg bg-slate-500 w-full aspect-square" />
                </div>
              </div>
            </div>
          </WhiteContainer>
        </div>
      </div>
      <SubscribeSection />
    </div>
  );
}

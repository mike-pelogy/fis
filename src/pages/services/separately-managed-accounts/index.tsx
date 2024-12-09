import { API } from "@/constants";
import { kocgPageQuery } from "@/data/kocgPageQuery";
import { NextPageWithLayout } from "@/pages/_app";
import request from "graphql-request";
import { ReactElement } from "react";
import { Nav } from "../individuals/financial-planning";
import WhiteContainer from "@/components/WhiteContainer";
import FunBackground from "@/components/FunBackground";
import TextField from "@/components/Forms/TextField";
import Button from "@/components/Button";

export async function getStaticProps() {
  const data = await request(API, kocgPageQuery);

  return {
    props: {
      data: data.page.kocg,
      title: data.page.title,
    },
  };
}

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--blue)/0.15)_0%,rgba(256,256,256,1)_50%)]";

const AccessFISForm = () => {
  const handleSubmit = () => {
    alert("TODO: submit the data");
  };

  return (
    <form
      name="contactForm"
      onSubmit={handleSubmit}
      data-netlify="true"
      className="flex flex-col gap-4"
    >
      <div className="flex gap-4">
        <div className="w-1/2">
          <TextField name="firstName" label="First Name:" />
        </div>
        <div className="w-1/2">
          <TextField name="lastName" label="Last Name:" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <TextField name="email" label="Email:" type="email" />
        </div>
        <div className="w-1/2">
          <TextField name="subject" label="Subject:" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <TextField
            name="message"
            label="Comment or Message:"
            type="textarea"
          />
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

const EndowmentsPage: NextPageWithLayout = () => {
  return (
    <>
      <section className="w-full pt-fis-1 pb-fis-2 flex justify-center bg-slate-100">
        <div className="container flex items-center">
          <div className="w-1/2">
            <p>
              FIS believes a well-crafted financial plan expresses your most
              meaningful values and goals. Our process drives to your clear
              goals and helps focus your actions thus allowing you to proceed
              with confidence. Life is unpredictable. It is our goal for you to
              go forward with a sense of confidence. With Faith Investor
              Services, you have a team of professionals by your side to guide
              you through life’s challenges and uncover opportunities. We guide
              you in planning for life’s unexpected events:
            </p>
          </div>
          <div className="w-1/2 pl-fis-2">
            <div className="w-full aspect-square bg-slate-500 rounded" />
          </div>
        </div>
      </section>
      <section className="w-full pt-fis-1 pb-fis-2 flex justify-center ">
        <div className="container flex items-center">
          <div className="w-1/2">
            <div className="w-full aspect-square bg-slate-500 rounded" />
          </div>
          <div className="w-1/2 pl-fis-2">
            <p>
              FIS believes a well-crafted financial plan expresses your most
              meaningful values and goals. Our process drives to your clear
              goals and helps focus your actions thus allowing you to proceed
              with confidence. Life is unpredictable. It is our goal for you to
              go forward with a sense of confidence. With Faith Investor
              Services, you have a team of professionals by your side to guide
              you through life’s challenges and uncover opportunities. We guide
              you in planning for life’s unexpected events:
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-fis-2 flex justify-center bg-slate-100">
        <div className="container flex items-center">
          <div className="w-1/2 pr-fis-2">
            <p>
              FIS believes a well-crafted financial plan expresses your most
              meaningful values and goals. Our process drives to your clear
              goals and helps focus your actions thus allowing you to proceed
              with confidence. Life is unpredictable. It is our goal for you to
              go forward with a sense of confidence. With Faith Investor
              Services, you have a team of professionals by your side to guide
              you through life’s challenges and uncover opportunities. We guide
              you in planning for life’s unexpected events:
            </p>
          </div>
          <div className="w-1/2 pl-fis-2">
            <p>
              FIS believes a well-crafted financial plan expresses your most
              meaningful values and goals. Our process drives to your clear
              goals and helps focus your actions thus allowing you to proceed
              with confidence. Life is unpredictable. It is our goal for you to
              go forward with a sense of confidence. With Faith Investor
              Services, you have a team of professionals by your side to guide
              you through life’s challenges and uncover opportunities. We guide
              you in planning for life’s unexpected events:
            </p>
          </div>
        </div>
      </section>
      <div className="flex justify-center relative w-full pt-fis-2 pb-fis-2">
        <div className="w-full h-[calc(100%-120px)] absolute left-0 bottom-0 bg-fis-blue/10 z-[-1]">
          <FunBackground />
        </div>
        <div className="container w-full">
          <WhiteContainer>
            <section className="flex container w-full px-fis-1">
              <div className="w-1/2 pr-fis-1">
                <p>
                  FIS believes a well-crafted financial plan expresses your most
                  meaningful values and goals. Our process drives to your clear
                  goals and helps focus your actions thus allowing you to
                  proceed with confidence. Life is unpredictable. It is our goal
                  for you to go forward with a sense of confidence. With Faith
                  Investor Services, you have a team of professionals by your
                  side to guide you through life’s challenges and uncover
                  opportunities. We guide you in planning for life’s unexpected
                  events:
                </p>
              </div>
              <div className="w-1/2">
                <div className="pl-fis-1">
                  <AccessFISForm />
                </div>
              </div>
            </section>
          </WhiteContainer>
        </div>
      </div>
    </>
  );
};

const subLayout = (page: ReactElement) => {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div className="bg-slate-100 w-full flex justify-center">
        <div className="container w-full">
          <Nav />
        </div>
      </div>
      <div className="w-full flex flex-col items-center">{page}</div>
    </div>
  );
};

EndowmentsPage.getSubLayout = subLayout;

export default EndowmentsPage;

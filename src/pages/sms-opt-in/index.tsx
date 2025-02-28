import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";

export default function SmsOptInPage() {
  return (
    <>
      <Head>
        <title>{buildPageTitle("SMS Opt-in")}</title>
      </Head>
      <div className="bg-slate-100 w-full min-h-screen flex justify-center items-center py-fis-2 px-4">
        <div className="container max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://clerk.chat/misc/sms-opt-in/?widgetId=436575ae-f7ab-41d8-8c98-f4048482a9a2"
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              minWidth: "320px",
              minHeight: "600px",
            }}
            id="clerk-opt-in-form"
            title="Clerk Chat Opt in form"
          />
        </div>
      </div>
    </>
  );
} 
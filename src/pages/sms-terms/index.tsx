import buildPageTitle from "@/utils/buildPageTitle";
import Head from "next/head";
import { fancyBulletPoints } from "../about";
import classNames from "classnames";

const radialBg =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--blue)/0.2)_0%,rgba(256,256,256,1)_60%)]";

export default function SmsTerms() {
  return (
    <>
      <Head>
        <title>{buildPageTitle("SMS Terms and Conditions of Service")}</title>
      </Head>
      <div
        className={classNames(
          radialBg,
          "flex w-full justify-center px-4 md:px-fis-1 py-fis-2"
        )}
      >
        <section className="max-w-[768px] w-full">
          <h1 className="mb-4 text-3xl text-fis-blue">SMS Terms and Conditions of Service</h1>
          <div className={fancyBulletPoints}>
            <p>
              By opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Faith Investor Services. This includes SMS messages for appointment scheduling, appointment reminders, post-visit instructions, billing notifications, and other communication needs. Message frequency varies. Message and data rates may apply. See privacy policy at <a href="/privacy-policy" className="text-fis-blue hover:underline">Privacy Policy</a>. Message HELP for help. Reply STOP to any message to opt out.
            </p>
          </div>
        </section>
      </div>
    </>
  );
} 
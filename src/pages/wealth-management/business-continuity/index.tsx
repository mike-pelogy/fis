import Button from "@/components/Button";
import FunBackground from "@/components/FunBackground";
import WhiteContainer from "@/components/WhiteContainer";
import { NextPageWithLayout } from "@/pages/_app";
import buildPageTitle from "@/utils/buildPageTitle";
import ArrowRight from "@/svgs/ArrowRight";
import Handshake from "@/svgs/Handshake";
import Phone from "@/svgs/Phone";
import Mail from "@/svgs/Mail";
import People from "@/svgs/People";
import Shield from "@/svgs/Shield";
import Caution from "@/svgs/Caution";
import Apartment from "@/svgs/Apartment";
import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import Checkmark from "@/svgs/checkmark";
import TrendingDown from "@/svgs/TrendingDown";

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--blue)/0.12)_0%,rgba(256,256,256,1)_55%)]";

const BusinessContinuityPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{buildPageTitle("Business Continuity & Exit Planning")}</title>
      </Head>
      <section
        className={classNames(
          "w-full flex justify-center",
        )}
      >
        <div className="flex justify-center relative w-full ">
          {/* <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
            <FunBackground />
          </div> */}
          <div className="container w-full">

              <section>
                <div className="flex flex-col md:flex-row items-center gap-8 pt-8 md:pt-0 px-4 md:px-0">
                  <div className="w-full md:w-1/2 md:pr-fis-2">
                    <h1 className="text-3xl md:text-4xl  font-bold text-fis-blue mb-4">
                      Business Continuity &amp; Exit Planning - Preparing for
                      What&apos;s Next
                    </h1>
                    <hr className="my-4" />
                    <p className="mb-4 text-base md:text-lg">
                      At <span className="font-semibold">Faith Investor Services</span>, we know that business success
                      isn&apos;t just about performance today — it&apos;s about
                      preserving tomorrow. Thoughtful planning ensures you can
                      get the most out of your company.
                    </p>
                    <p className="mb-8 text-base md:text-lg">
                      Our{" "}
                      <span className="font-semibold">
                        Business Continuity and Succession Planning
                      </span>{" "}
                      services are designed to help you safeguard what you&apos;ve
                      built and ensure a seamless transition.
                    </p>
                    <Button
                      href="/contact"
                      variant="blue"
                      IconButton={<ArrowRight />}
                    >
                      Schedule a Consultation
                    </Button>
                  </div>
                  <div className="w-full md:w-1/2 md:mt-fis-2 md:mt-0">
                    <Image
                      src="https://faithinvestorservices.flywheelsites.com/wp-content/uploads/Rectangle-2.jpg"
                      alt="Business leaders collaborating around a table"
                      width={1500}
                      height={1500}
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </section>
          </div>
        </div>
      </section>
      {/* Continuity Starts with Clarity section */}
      <section className="w-full bg-slate-100 py-fis-2 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-fis-blue mb-6">
              Continuity Starts with Clarity
            </h2>
            <p className="text-base md:text-lg text-slate-700 mb-1">
              Unexpected events can disrupt even the strongest organizations.
            </p>
            <p className="text-base md:text-lg text-slate-700 mb-12">
              A proactive continuity plan protects your business and those who depend on it by preparing for:
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid gap-4 md:gap-6 md:grid-cols-2 mt-12">
            <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-4 md:px-6 md:py-5">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 border border-slate-200 mr-4 flex-shrink-0">
                <People />
              </div>
              <p className="text-base md:text-lg text-slate-800 text-left">
                Sudden loss of leadership
              </p>
            </div>
            <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-4 md:px-6 md:py-5">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 border border-slate-200 mr-4 flex-shrink-0">
                <Shield />
              </div>
              <p className="text-base md:text-lg text-slate-800 text-left">
                Key-person risk mitigation
              </p>
            </div>
            <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-4 md:px-6 md:py-5">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 border border-slate-200 mr-4 flex-shrink-0">
                <Caution />
              </div>
              <p className="text-base md:text-lg text-slate-800 text-left">
                Crisis and disaster recovery
              </p>
            </div>
            <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-4 md:px-6 md:py-5">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 border border-slate-200 mr-4 flex-shrink-0">
                <Apartment />
              </div>
              <p className="text-base md:text-lg text-slate-800 text-left">
                Governance structures that support long-term stability
              </p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto mt-10 text-base md:text-lg text-slate-600 italic">
            With our team by your side, you can move confidently – knowing your business is{" "}
            <span className="font-semibold">
              prepared for tomorrow, no matter what it brings.
            </span>
          </div>
        </div>
      </section>
      {/* Succession Planning section */}
      <section className="container px-4 md:px-fis-2 pt-fis-2 pb-fis-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-fis-blue mb-4">
            Succession Planning
          </h2>
          <p className="text-base md:text-lg text-slate-700 mb-8">
            Succession planning is more than a financial transaction — it&apos;s a deeply
            personal process. We work with entrepreneurs, executives, and family business
            leaders to:
          </p>
        </div>
        <div className="mt-8 space-y-6 max-w-3xl mx-auto">
          {[
            {
              title: "Develop a Sale and Exit Strategy",
              description: "that suits your timeline",
            },
            {
              title: "Personalize strategies",
              description: "to preserve both your business and your legacy",
            },
            {
              title: "Identify and prepare future leaders",
              description: "whether internal or external",
            },
            {
              title: "Integrate family, ownership, and governance structures",
              description: "that promote continuity",
            },
            {
              title: "Mitigate tax and liquidity risks",
              description: "to protect assets and ensure smooth transitions",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Checkmark />
              </div>
              <p className="text-base md:text-lg text-slate-800">
                <span className="font-semibold">{item.title}</span>{" "}
                <span>{item.description}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-base md:text-lg text-slate-500 italic max-w-4xl mx-auto">
          Our mission is to help you{" "}
          <span className="font-semibold">
            retain and grow enterprise value, protect your team, and secure your legacy.
          </span>
        </div>
      </section>
      {/* Why It Matters section */}
      <section className="w-full bg-fis-blue py-fis-1 px-4 md:px-0">
        <div className="container mx-auto">
          <div className=" px-4 md:px-12 md:py-12 text-white text-center">
            <h2 className="text-3xl md:text-5xl font-semibold mb-8">
              Why It Matters
            </h2>
            <div className="max-w-xl mx-auto text-left">
              <ul className="list-disc list-inside space-y-3 text-base md:text-xl">
                <li>You&apos;ve worked too hard to leave the future of your business to chance.</li>
                <li>Your legacy may be unprotected.</li>
                <li>Lack of planning can drive the value down.</li>
              </ul>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto text-lg">
              {[
                {
                  percentage: "70%*",
                  description:
                    "of family businesses do not survive the second generation.",
                },
                {
                  percentage: "90%*",
                  description:
                    "of business owners don’t have a formal succession plan. Without it, value decreases.",
                },
              ].map((item) => (
                <div
                  key={item.percentage}
                  className="bg-[rgba(65,223,255,0.12)] rounded-2xl px-6 py-8 flex flex-col items-center text-center"
                >
                  <div className="mb-4">
                    <TrendingDown />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[#41DFFF] mb-2">
                    {item.percentage}
                  </div>
                  <p className="text-base md:text-lg max-w-xs">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-base md:text-lg">
              Let us help you develop a comprehensive plan for the next chapter.
            </p>
            <p className="mt-6 text-xs md:text-sm text-[#B3EFFF] italic">
              *Sources: PwC Family Business Survey, Exit Planning Institute
            </p>
          </div>
        </div>
      </section>
      {/* One Comprehensive Partnership section */}
      <section className="w-full bg-slate-100 py-fis-3 px-4 md:px-0">
        <div className="container mx-auto flex flex-col items-center text-center">
          <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20  rounded-full bg-white border border-slate-200">
              <Handshake />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-10">
            One Comprehensive Partnership
          </h2>
          <div className="max-w-3xl text-base md:text-lg text-slate-700 space-y-4">
            <p>
              We provide a unified approach that bridges both{" "}
              <span className="font-semibold">
                business and personal financial planning
              </span>{" "}
              — from projections and valuations to investment strategies and
              estate planning.
            </p>
            <p>
              With Faith Investor Services, you get the{" "}
              <span className="font-semibold">best of both worlds</span> under
              one trusted umbrella.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-white py-fis-2 px-4 md:px-0">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold  mb-4">
            Let&apos;s Start the Conversation
          </h2>
          <p className="text-base md:text-lg text-slate-700 mb-2 max-w-3xl mx-auto">
            Whether your transition is five years away or right around the corner, now is the time to prepare.
          </p>
          <p className="text-base md:text-lg text-slate-700 mb-8 max-w-3xl mx-auto">
            Contact <span className="font-semibold">Faith Investor Services</span> to explore how we can help you preserve your legacy and secure your future.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="blue"
              LeadingIconButton={<Phone />}
              className="px-8"
            >
              Contact Us
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              LeadingIconButton={<Mail width="20px" height="20px" />}
              className="min-w-[220px]"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};

export default BusinessContinuityPage;

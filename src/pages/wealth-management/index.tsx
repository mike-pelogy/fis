import Button from "@/components/Button";
import ArrowRight from "@/svgs/ArrowRight";
import { fancyBulletPoints } from "../about";
import getGqlRequest from "@/data/getGqlRequest";
import { wealthManagementPageQuery } from "@/data/wealthManagementPageQuery";
import {
  Page_Wealthmanagement_Introduction,
  Page_Wealthmanagement_Services,
} from "@/gql/graphql";

export async function getStaticProps() {
  const { data } = await getGqlRequest(wealthManagementPageQuery);

  const { services, introduction } = data.page.wealthManagement;
  return {
    props: {
      services,
      introduction,
    },
  };
}

const ServiceCard = ({
  service,
}: {
  service: { title?: string; description?: string };
}) => {
  return (
    <div className="rounded-lg bg-slate-50 p-4" key={service?.title}>
      <h4
        className="font-bold mb-2"
        dangerouslySetInnerHTML={{
          __html: service?.title as string,
        }}
      />
      <span
        className={fancyBulletPoints}
        dangerouslySetInnerHTML={{
          __html: service?.description as string,
        }}
      />
    </div>
  );
};

const WealthManagementPage = ({
  introduction,
  services,
}: {
  introduction: Page_Wealthmanagement_Introduction;
  services: Page_Wealthmanagement_Services;
}) => {
  return (
    <>
      <div className="bg-slate-50 w-full py-fis-2 flex justify-center">
        <section className="container flex flex-col md:flex-row items-center px-4 md:px-fis-2">
          <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
            <h3 className="text-fis-blue text-2xl">{introduction.title}</h3>
            <hr className="mt-4 mb-6" />
            <div
              dangerouslySetInnerHTML={{
                __html: introduction.description || "",
              }}
            />
            <div className="flex justify-end mt-8">
              <Button variant="secondary" href="#" IconButton={<ArrowRight />}>
                {introduction.cta?.title}
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
            <div className="w-full aspect-video bg-slate-500 rounded-lg" />
          </div>
        </section>
      </div>
      <div className="w-full py-fis-2 px-4 md:px-0 flex justify-center">
        <section className="w-full container">
          <h2 className="text-5xl font-bold text-center mb-fis-1">
            {services?.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full justify-center mb-fis-2">
            {services?.services?.map((s) => {
              if (!s) return null;
              // @ts-expect-error mismatch types
              return <ServiceCard service={s} key={s.title} />;
            })}
          </div>
          <div className="flex justify-center">
            <div className="bg-slate-500 w-full aspect-square rounded-lg max-w-[600px]" />
          </div>
        </section>
      </div>
      <div className="bg-slate-50 w-full py-fis-2 flex justify-center">
        <section className="container px-4 md:px-fis-2 flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
            <div className="bg-slate-500 w-full aspect-video rounded-lg" />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-fis-2">
            <h3 className="text-fis-blue text-2xl mb-4">
              Interested in more information?
            </h3>
            <p className="font-bold mb-fis-1">
              Reach out and let’s explore how we can support you.
            </p>
            <Button
              href="/contact"
              variant="secondary"
              IconButton={<ArrowRight />}
            >
              Connect with us
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default WealthManagementPage;

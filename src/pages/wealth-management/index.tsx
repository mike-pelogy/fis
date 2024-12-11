import Button from "@/components/Button";
import { API } from "@/constants";
import { kocgPageQuery } from "@/data/kocgPageQuery";
import ArrowRight from "@/svgs/ArrowRight";
import request from "graphql-request";
import { fancyBulletPoints } from "../about";

export async function getStaticProps() {
  const data = await request(API, kocgPageQuery);

  return {
    props: {
      data: data.page.kocg,
      title: data.page.title,
    },
  };
}

const services = [
  { title: "Strat", content: "content" },
  { title: "Investments", content: "content" },
  { title: "Fiduciary", content: "content" },
  { title: "Legacy", content: "content" },
];

const WealthManagementPage = () => {
  return (
    <>
      <div className="bg-slate-50 w-full py-fis-2 flex justify-center">
        <section className="container flex flex-col md:flex-row items-center px-4 md:px-fis-2">
          <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
            <h3 className="text-fis-blue text-2xl">About Wealth Management</h3>
            <hr className="mt-4 mb-6" />
            <p>
              We seek performance in a faithful manner.  Our team strives to
              generate returns while remaining consistent with biblical values. 
              We bring a passion for service and work to help you be thoughtful
              stewards of God’s abundant gifts.
            </p>
            <div className="flex justify-end mt-8">
              <Button variant="secondary" href="#" IconButton={<ArrowRight />}>
                Login
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
          <h2 className="text-5xl font-bold text-center mb-fis-1">Sevices</h2>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center mb-fis-2">
            {services.map(({ title, content }) => (
              <div className="rounded-lg bg-slate-50 p-4" key={title}>
                <h4 className="font-bold">{title}</h4>
                <p className={fancyBulletPoints}>{content}</p>
              </div>
            ))}
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

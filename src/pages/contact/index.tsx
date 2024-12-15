import Button from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import TextField from "@/components/Forms/TextField";
import FunBackground from "@/components/FunBackground";
import WhiteContainer from "@/components/WhiteContainer";
import { aboutPageQuery } from "@/data/aboutPageQuery";
import { Page_Aboutpage } from "@/gql/graphql";
import Phone from "@/svgs/Phone";
import classNames from "classnames";
import ArrowRight from "@/svgs/ArrowRight";
import Mail from "@/svgs/Mail";
import LocationMarker from "@/svgs/LocationMarker";
import getGqlRequest from "@/data/getGqlRequest";

export async function getStaticProps() {
  const { data } = await getGqlRequest(aboutPageQuery);

  return {
    props: {
      data: data.page.aboutPage as Page_Aboutpage,
    },
  };
}

export const navBar = [
  { title: "Contact Us", href: "/contact" },
  { title: "Careers", href: "/contact/careers" },
];

const locations = [
  {
    phone: "523-2333-1532",
    email: "info@fisetfs.com",
    location: "10440 N. Central Expressway Suite 800 Dallas, TX 75231",
  },
  {
    phone: "523-2333-1532",
    email: "info@fisetfs.com",
    location: "10440 N. Central Expressway Suite 800 Dallas, TX 75231",
  },
];

const buttons = "text-fis-blue hover:text-fis-purple transition-all";

const ContactForm = () => {
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
          <TextField name="phone" label="Phone Number:" />
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
      <div className="flex justify-end mt-fis-1">
        <Button variant="secondary" onClick={() => {}}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export const SubscribeSection = () => {
  return (
    <div className="flex justify-center">
      <section className="flex flex-col-reverse md:flex-row pt-fis-2 container px-4 md:px-fis-2 items-center">
        <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
          <div className="rounded-lg aspect-video bg-slate-500 w-full" />
        </div>
        <div className="w-full md:w-1/2 pl-0 md:pl-fis-2">
          <h3 className="text-2xl text-fis-blue mb-4">
            Subscribe for Faith Investor Services Insights
          </h3>
          <p className="font-bold mb-4 max-w-[400px]">
            Subscribe now for the latest insights and market outlook from Faith
            Investor Services.
          </p>
          <form
      name="subscribe"
      data-netlify="true"
          >
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="w-full md:w-1/2">
                <TextField name="name" label="Name:" />
              </div>
              <div className="w-full md:w-1/2">
                <TextField name="email" label="Email:" type="email" />
              </div>
            </div>
            <div className="flex mt-fis-1">
              <Button
                variant="secondary"
                onClick={() => {}}
                IconButton={<ArrowRight />}
              >
                Subsribe
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default function ContactPage() {
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
              <section className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
                  <ContactForm />
                </div>
                <div className="w-full md:w-1/2 flex flex-col pt-fis-1 md:pt-0 gap-fis-1 md:gap-fis-2">
                  {locations.map(({ phone, email, location }) => (
                    <div key={phone} className="flex flex-col gap-2">
                      <a
                        className={classNames("flex items-center", buttons)}
                        href={`tel:${phone}`}
                      >
                        <Phone />
                        <div className="ml-2">{phone}</div>
                      </a>
                      <a
                        className={classNames("flex items-center", buttons)}
                        href={`mailto:${email}`}
                      >
                        <Mail />
                        <div className="ml-2">{email}</div>
                      </a>
                      <a
                        className={classNames("flex items-center", buttons)}
                        href="#"
                      >
                        <LocationMarker />
                        <div className="ml-2">{location}</div>
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </WhiteContainer>
        </div>
      </div>
      <SubscribeSection />
    </div>
  );
}

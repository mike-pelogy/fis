import buildPageTitle from "@/utils/buildPageTitle";
import Head from "next/head";
import { fancyBulletPoints } from "../about";
import classNames from "classnames";

const radialBg =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--blue)/0.2)_0%,rgba(256,256,256,1)_60%)]";

export default function PrivacyPolicy() {
  const title = "Privacy Policy";

  return (
    <>
      <Head>
        <title>{buildPageTitle(title)}</title>
      </Head>
      <div
        className={classNames(
          radialBg,
          "flex w-full justify-center px-4 md:px-fis-1 py-fis-2"
        )}
      >
        <section className="max-w-[768px] w-full">
          <h1 className="mb-4 text-3xl text-fis-blue">{title}</h1>
          <h1 className="mb-4 text-2xl">Faith Investor Services</h1>
          <div className={fancyBulletPoints}>
            <p>
              Faith Investor Services has adopted this privacy policy with
              recognition that protecting the privacy and security of the
              personal information we obtain about our customers is an important
              responsibility. We also know that you expect us to service you in
              an accurate and efficient manner. To do so, we must collect and
              maintain certain personal information about you. We want you to
              know what information we collect and how we use and safeguard that
              information.
            </p>
            <p>
              <strong>Information We Collect:</strong> We collect certain
              nonpublic information about you ("Customer Information"). The
              essential purpose for collecting Customer Information is to allow
              us to provide advisory services to you. Customer Information we
              collect may include:
            </p>
            <ul className="fancylist">
              <li>
                Information that you provide on applications or other forms.
                This Customer Information may include personal and household
                information such as income, spending habits, investment
                objectives, financial goals, statements of account, and other
                records concerning your financial condition and assets, together
                with information concerning employee benefits and retirement
                plan interests, wills, trusts, mortgages and tax returns.
              </li>
              <li>
                Identifying information such as your name, age, address, social
                security number, etc.
              </li>
              <li>
                Information about your transactions with us, or others (e.g.,
                broker-dealers, clearing firms, or other chosen investment
                sponsors).
              </li>
              <li>
                Information we receive from consumer reporting agencies (e.g.,
                credit bureaus), as well as other various materials we may use
                to provide an appropriate recommendation or to fill a service
                request.
              </li>
            </ul>
            <p>
              <strong>Security of Your Information:</strong> We restrict access
              to your nonpublic personal information to those employees who need
              to know that information to service your account. We maintain
              physical, electronic and procedural safeguards that comply with
              applicable federal or state standards to protect your nonpublic
              personal information.
            </p>
            <p>
              <strong>Information We Disclose:</strong> We do not disclose the
              nonpublic personal information we collect about our customers to
              anyone except: (i) in furtherance of our business relationship
              with them and then only to those persons necessary to effect the
              transactions and provide the authorized services (such as
              broker-dealers, custodians, independent managers etc.); (ii) to
              persons assessing our compliance with industry standards (e.g.,
              professional licensing authorities, consultants, etc.); (iii) our
              attorneys, accountants, and auditors; or (iv) as otherwise
              provided by law.
            </p>
            <p>
              We are permitted by law to disclose the nonpublic personal
              information about you to governmental agencies and other third
              parties in certain circumstances (such as third parties that
              perform administrative or marketing services on our behalf or for
              joint marketing programs). These third parties are prohibited to
              use or share the information for any other purpose.
            </p>
            <p>
              <strong>Former Clients:</strong> If you decide to close your
              account(s) or become an inactive customer, we will adhere to our
              privacy policies, which may be amended from time to time.
            </p>
            <p>
              <strong>Changes to Our Privacy Policy:</strong> In the event there
              were to be a material change to our privacy policy regarding how
              we use your confidential information, we will provide written
              notice to you. Where applicable, you would be given an opportunity
              to limit or opt-out of such disclosure arrangements. Questions: If
              you have questions about this privacy notice or about the privacy
              of your customer information call our main number{" "}
              <a href="tel:214-462-7244">214-462-7244</a> and ask to speak to
              the Chief Compliance Officer.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

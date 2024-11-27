import React from "react";
import { Page_Homepage_ContactUsCtaSimple } from "@/gql/graphql";
import Button from "./Button";

export default function ConnectWithUs({
  connectWithUs,
}: {
  connectWithUs: Page_Homepage_ContactUsCtaSimple;
}) {
  return (
    <section>
      <h2 dangerouslySetInnerHTML={{ __html: connectWithUs.title as string }} />
      <span
        dangerouslySetInnerHTML={{
          __html: connectWithUs.description as string,
        }}
      />
      <Button variant="primary" href={connectWithUs.link?.url as string}>
        {connectWithUs.link?.title}
      </Button>
    </section>
  );
}

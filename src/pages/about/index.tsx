import { API } from "@/constants";
import { aboutPageQuery } from "@/data/aboutPageQuery";
import {
  Page_Aboutpage,
  Page_Aboutpage_About,
  Page_Aboutpage_Mission,
  Page_Aboutpage_Values,
} from "@/gql/graphql";
import request from "graphql-request";

export async function getStaticProps() {
  const data = await request(API, aboutPageQuery);

  return {
    props: {
      data: data.page.aboutPage as Page_Aboutpage,
    },
  };
}

const MissionAndValues = ({
  mission,
  values,
}: {
  mission: Page_Aboutpage_Mission;
  values: Page_Aboutpage_Values;
}) => {
  return (
    <div>
      <section>
        <div>
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: mission.title as string }} />
            <span
              dangerouslySetInnerHTML={{
                __html: mission.description as string,
              }}
            />
          </div>
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: values.title as string }} />
            <span
              dangerouslySetInnerHTML={{ __html: values.description as string }}
            />
          </div>
        </div>
        <div>image</div>
      </section>
    </div>
  );
};

const AboutOurTeam = ({ about }: { about: Page_Aboutpage_About }) => {
  return (
    <section>
      <h3 dangerouslySetInnerHTML={{ __html: about.title as string }} />
      <span dangerouslySetInnerHTML={{ __html: about.description as string }} />
      <div>team members</div>
    </section>
  );
};

export default function AboutPage({ data }: { data: Page_Aboutpage }) {
  return (
    <>
      {data.mission && data.values && (
        <MissionAndValues mission={data.mission} values={data.values} />
      )}
      {data.valuesCopy && <AboutOurTeam about={data.valuesCopy} />}
    </>
  );
}

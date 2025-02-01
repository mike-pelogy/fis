import { MediaItem } from "@/gql/graphql";
import { parse } from "csv-parse/sync";

const fetchCSV = async (url: string) => {
  const d = await fetch(url, {
    method: "get",
    headers: {
      "content-type": "text/csv;charset=UTF-8",
    },
  }).then((res) => res.text());

  return parse(d, {
    columns: true,
  });
};

export default async function getEtfData({
  daily,
  monthly,
  quarterly,
  holdings,
}: {
  daily?: MediaItem;
  monthly?: MediaItem;
  quarterly?: MediaItem;
  holdings?: MediaItem;
}) {
  const dailyRes = await fetchCSV(daily?.mediaItemUrl || "");
  const monthlyRes = await fetchCSV(monthly?.mediaItemUrl || "");
  const quarterlyRes = await fetchCSV(quarterly?.mediaItemUrl || "");
  const holdingsRes = await fetchCSV(holdings?.mediaItemUrl || "");

  return {
    dailyRes,
    monthlyRes,
    quarterlyRes,
    holdingsRes,
  };
}

export type ETFDataType = Awaited<ReturnType<typeof getEtfData>>;

import { API_REST } from "@/constants";
import useFetch from "@/data/useFetch";
import { parse } from "csv-parse/sync";

const parseToCsv = (d: string) => {
  return parse(d, {
    columns: true,
  });
};

export default function useEtfData() {
  const { data: dData, isLoading: dLoading } = useFetch(`${API_REST}/daily`);
  const { data: mData, isLoading: mLoading } = useFetch(`${API_REST}/monthly`);
  const { data: qData, isLoading: qLoading } = useFetch(
    `${API_REST}/quarterly`
  );
  const { data: hData, isLoading: hLoading } = useFetch(
    `${API_REST}/top-holdings`
  );

  return {
    dailyRes: parseToCsv(dData),
    monthlyRes: parseToCsv(mData),
    quarterlyRes: parseToCsv(qData),
    holdingsRes: parseToCsv(hData),
    isLoading: dLoading || mLoading || qLoading || hLoading,
  };
}

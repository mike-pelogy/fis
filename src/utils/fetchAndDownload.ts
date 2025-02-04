import { API_REST } from "@/constants";
import { toast } from "react-toastify";

export async function fetchAndDownloadCsv(route: string) {
  return fetch(`${API_REST}${route}`)
    .then((res) => {
        return res.text();
    })
    .then((txt) => {
      const trimmedStart = txt.substring(1);
      const trimmedEnd = trimmedStart.substring(0, trimmedStart.length - 1);
      const text = trimmedEnd.trim().split('\\r\\n');

      let csvContent = "data:text/csv;charset=utf-8,";

      text.forEach(t => {
        csvContent += t + "\r\n"
      })

      const link = document.createElement("a");
      link.href = csvContent;
      link.download = 'holdings';
      link.click();
    })
    .then(() => {
      toast.success("File downloaded successfully.");
    })
    .catch((e) => {
      toast.error("There was an error downloading. Please try again.");
      console.error(e);
    });
}

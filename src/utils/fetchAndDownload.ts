import { API_REST } from "@/constants";
import { toast } from "react-toastify";

const getFileNameFromRes = function (header: string) {
  const contentDispostion = header.split(";");
  const fileNameToken = `filename*=UTF-8''`;

  console.log({header});

  let fileName = "downloaded.pdf";
  for (const thisValue of contentDispostion) {
    if (thisValue.trim().indexOf(fileNameToken) === 0) {
      fileName = decodeURIComponent(
        thisValue.trim().replace(fileNameToken, "")
      );
      break;
    }
  }

  return fileName;
};

export default async function fetchAndDownload(route: string) {
  return fetch(`${API_REST}${route}`)
    .then(async (res) => {
      const h = res.headers.get("Content-Disposition");
      console.log(res.headers.get('content-disposition'));
      return {
        filename: h ? getFileNameFromRes(h) : "file",
        blob: await res.blob(),
      };
    })
    .then((resObj) => {
      // It is necessary to create a new blob object with mime-type explicitly set for all browsers except Chrome, but it works for Chrome too.
      const newBlob = new Blob([resObj.blob], { type: "application/pdf" });

      // For other browsers: create a link pointing to the ObjectURL containing the blob.
      const objUrl = window.URL.createObjectURL(newBlob);

      const link = document.createElement("a");
      link.href = objUrl;
      link.download = resObj.filename;
      link.click();

      // For Firefox it is necessary to delay revoking the ObjectURL.
      setTimeout(() => {
        window.URL.revokeObjectURL(objUrl);
      }, 250);
    })
    .then(() => {
      toast.success("File downloaded successfully.");
    })
    .catch((e) => {
      toast.error("There was an error downloading. Please try again.");
      console.error(e);
    });
}

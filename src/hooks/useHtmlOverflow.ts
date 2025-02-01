import { useEffect } from "react";

export function useHtmlOverflow() {
  useEffect(() => {
    const htmlTag = document.getElementsByTagName("html");
    htmlTag[0].classList.add("overflow-hidden");

    return () => {
      htmlTag[0].classList.remove("overflow-hidden");
    };
  }, []);
}



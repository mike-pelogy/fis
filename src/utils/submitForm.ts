import { FormEvent } from "react";
import { toast } from "react-toastify";

export const handleSubmit =
  (isForm = false) =>
  async (event: FormEvent) => {
    event.preventDefault();

    const myForm = event.target as HTMLFormElement;
    // eslint-disable-next-line
    const formData: any = new FormData(myForm);

    await fetch("/", {
      method: "POST",
      headers: !isForm
        ? { "Content-Type": "application/x-www-form-urlencoded" }
        : {},
      body: !isForm ? new URLSearchParams(formData).toString() : formData,
    })
      .then((res) => {
        if (String(res.status).startsWith("2")) {
          toast.success("Form submitted successfully");
          myForm.reset();
          myForm.querySelectorAll('input[type="file"]').forEach((ele) => {
            const v = ele as HTMLInputElement;
            v.value = "";
          });
          document.dispatchEvent(new CustomEvent("resetField"));
        } else {
          toast.error("Form submission failed");
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error("Form submission failed");
      });
  };

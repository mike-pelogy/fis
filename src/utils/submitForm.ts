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
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        toast.success("Form submitted successfully");
        myForm.reset();
        myForm.querySelectorAll('[input="file"]').forEach((value) => {
          const v = value as HTMLInputElement;
          v.value = "";
        });
      })
      .catch((e) => {
        console.error(e);
        toast.error("Form submission failed");
      });
  };

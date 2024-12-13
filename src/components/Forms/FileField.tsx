import Field, { IFieldProps } from "./Field";
import React from "react";

type ITextFieldProps = Omit<IFieldProps, "children">;

export default function FileField({ label, name }: ITextFieldProps) {
  return (
    <Field label={label} name={name}>
      <input name="file" type="file" required />
    </Field>
  );
}

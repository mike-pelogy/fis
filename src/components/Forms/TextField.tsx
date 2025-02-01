import React from "react";
import classNames from "classnames";
import Field, { IFieldProps } from "./Field";

const inputClass = "border-[1px] rounded border-slate-200 p-2";

interface ITextFieldProps extends Omit<IFieldProps, "children"> {
  type?: "text" | "email" | "textarea" | "tel";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (val: any) => void;
  value?: string | number | string[];
}

export default function TextField({
  label,
  name,
  type = "text",
  onChange,
  value,
}: ITextFieldProps) {
  return (
    <Field label={label} name={name}>
      {type === "textarea" ? (
        <textarea name={name} required className={classNames(inputClass)} />
      ) : (
        <input
          name={name}
          required
          value={value}
          id={name}
          type={type}
          className={classNames(inputClass)}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </Field>
  );
}

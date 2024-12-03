import classNames from "classnames";
import Field, { IFieldProps } from "./Field";

const inputClass = "border-[1px] rounded border-slate-200 p-2";

interface ITextFieldProps extends Omit<IFieldProps, "children"> {
  type?: "text" | "email" | "textarea";
}

export default function TextField({
  label,
  name,
  type = "text",
}: ITextFieldProps) {
  return (
    <Field label={label} name={name}>
      {type === "textarea" ? (
        <textarea name={name} required className={classNames(inputClass)} />
      ) : (
        <input
          name={name}
          required
          type={type}
          className={classNames(inputClass)}
        />
      )}
    </Field>
  );
}

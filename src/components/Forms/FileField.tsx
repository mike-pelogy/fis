import Field, { IFieldProps } from "./Field";

const inputClass = "border-[1px] rounded border-slate-200 p-2";

interface ITextFieldProps extends Omit<IFieldProps, "children"> { }

export default function FileField({
  label,
  name,
}: ITextFieldProps) {
  return (
    <Field label={label} name={name}>
      <input name="file" type="file" />
    </Field>
  );
}

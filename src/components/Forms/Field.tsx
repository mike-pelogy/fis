import { PropsWithChildren } from "react";

export interface IFieldProps extends PropsWithChildren {
  label: string;
  name: string;
}

export default function Field({ label, name, children }: IFieldProps) {
  return (
    <label className="flex flex-col space-y-2" htmlFor={name}>
      <span className="text-sm">{label}</span>
      {children}
    </label>
  );
}

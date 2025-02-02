import Download from "@/svgs/Download";
import Field, { IFieldProps } from "./Field";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface ITextFieldProps extends Omit<IFieldProps, "children"> {
  required?: boolean;
}

const LIMIT = 8;
const MB = 1000000;
const LIMIT_SIZE_MB = LIMIT * MB;

export default function FileField({ label, name, required }: ITextFieldProps) {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function resetFileField() {
      setFileName('');
    }
    document.addEventListener("resetField", resetFileField);
    return () => {
      document.removeEventListener("resetField", resetFileField);
    };
  }, []);

  return (
    <Field label={label} name={name}>
      <input
        ref={inputRef}
        name={name}
        id={name}
        type="file"
        required={required}
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          const file = e?.target?.files?.[0];

          if (file?.size && file.size <= LIMIT_SIZE_MB) {
            if (file?.name) {
              setFileName(file.name);
            }
          } else {
            toast.error("File size too large");
            if (inputRef.current?.value) {
              inputRef.current.value = "";
            }
          }
        }}
      />
      <div className="flex gap-4 align-center cursor-pointer group">
        <div className="text-fis-blue group-hover:text-fis-purple">
          <Download />
        </div>
        <label htmlFor={name} className="cursor-pointer text-sm">
          {fileName || "Choose a file"}
        </label>
      </div>
      <span className="pt-1 text-slate-400 text-xs">
        Max file upload: {LIMIT}MB
      </span>
    </Field>
  );
}

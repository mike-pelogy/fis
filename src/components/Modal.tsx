import ReactModal from "react-modal";
import { PropsWithChildren, useContext } from "react";
import { FontContext } from "@/components/FontProvider";
import classNames from "classnames";

interface IModalProps extends PropsWithChildren {
  isOpen: boolean;
}

export default function Modal({ isOpen, children }: IModalProps) {
  const { fontClassName } = useContext(FontContext);

  return (
    <ReactModal
      isOpen={isOpen}
      className="max-w-[625px] px-4 md:px-fis-2 py-fis-2 bg-white rounded-lg drop-shadow-2xl font-[inherit]"
      portalClassName={classNames(
        fontClassName,
        "[&>div]:font-[inherit] [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:z-[99999999]"
      )}
    >
      {children}
    </ReactModal>
  );
}

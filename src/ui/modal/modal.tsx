import { clsx } from "clsx";
import { PropsWithChildren } from "react";
import { IconX } from "@tabler/icons-react";
import { Container } from "./container";

const sizes = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: keyof typeof sizes;
}

export const Modal = (props: ModalProps) => {
  const { onClose, open, children, title, size = "md" } = props;

  return (
    <Container onClose={onClose} open={open}>
      <div
        className={clsx(
          "z-10 max-h-[calc(100vh-40px)] w-full overflow-y-auto rounded-lg bg-white shadow-md",
          sizes[size],
        )}
      >
        <header className="sticky top-0 flex items-center justify-between space-x-5 bg-white p-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="cursor-pointer p-1 transition hover:bg-gray-100"
          >
            <IconX size={20} />
          </button>
        </header>
        <div className="p-4 pt-0">{children}</div>
      </div>
    </Container>
  );
};

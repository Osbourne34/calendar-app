import { PropsWithChildren, useEffect } from "react";

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
}

export const Modal = (props: ModalProps) => {
  const { onClose, open, children, title } = props;

  if (!open) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
      <KeyboardListener on={onClose} codeKey="Escape" />
      <div
        onClick={onClose}
        className="absolute bottom-0 left-0 right-0 top-0 bg-black/30"
      ></div>

      <div className="z-10 w-full max-w-lg bg-white">
        <div className="flex items-center justify-between space-x-5 p-4">
          <p>{title}</p>
          <button onClick={onClose} className="px-2 py-1">
            x
          </button>
        </div>
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
};

interface KeyboardListenerProps {
  codeKey: string;
  on: () => void;
}

const KeyboardListener = ({ on, codeKey }: KeyboardListenerProps) => {
  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.code === codeKey) on();
    };

    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [codeKey, on]);

  return null;
};

import { PropsWithChildren, useEffect } from "react";
import { Portal } from "../../utils/portal";
import { Overlay } from "./overlay";
import { RemoveScroll } from "react-remove-scroll";

interface ContainerProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const Container = (props: ContainerProps) => {
  useEffect(() => {
    if (props.open) {
      const handler = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
          props.onClose();
        }
      };

      document.addEventListener("keydown", handler);

      return () => {
        document.removeEventListener("keydown", handler);
      };
    }
  }, [props]);

  if (!props.open) {
    return null;
  }

  return (
    <Portal>
      <RemoveScroll>
        <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center p-5">
          <Overlay onClick={props.onClose} />
          {props.children}
        </div>
      </RemoveScroll>
    </Portal>
  );
};

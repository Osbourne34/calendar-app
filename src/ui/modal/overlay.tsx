import { DetailedHTMLProps, HTMLAttributes } from "react";

interface OverlayProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Overlay = (props: OverlayProps) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 bg-black/30"
      {...props}
    ></div>
  );
};

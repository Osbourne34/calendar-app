import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps extends PropsWithChildren {}

export const Portal = (props: PortalProps) => {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  });

  return createPortal(props.children, container);
};

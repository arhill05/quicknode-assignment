import React, { ForwardedRef, forwardRef } from "react";
import { PropsWithChildren } from "react";

// eslint-disable-next-line react/display-name
// export const AnchorText = forwardRef(
//   (props: PropsWithChildren, ref: ForwardedRef<any>) => (
//     <span className="text-purple-800 font-semibold cursor-pointer">
//       {props.children}
//     </span>
//   )
// );

const AnchorText = forwardRef(({ children, onClick, href }, ref) => {
  return (
    <a
      className="text-purple-800 font-semibold cursor-pointer"
      href={href}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </a>
  );
});

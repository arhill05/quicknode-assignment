import React, { forwardRef, MouseEventHandler, PropsWithChildren } from "react";

export interface AnchorTextProps extends PropsWithChildren {
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const AnchorText = forwardRef<HTMLAnchorElement, AnchorTextProps>(
  ({ children, onClick, href }, ref) => {
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
  }
);

AnchorText.displayName = "AnchorText";

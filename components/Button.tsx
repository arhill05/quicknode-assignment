import { HTMLAttributes, PropsWithChildren, MouseEvent } from "react";

export interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  onClick?(event?: MouseEvent<HTMLButtonElement>): any;
  disabled?: boolean;
}

export const Button = ({ children, ...props }: ButtonProps) => (
  <button
    className="bg-purple-700 text-white font-bold px-8 py-2 rounded h-fit"
    {...props}
  >
    {children}
  </button>
);

import { PropsWithChildren } from "react";

export const Card = (props: PropsWithChildren) => (
  <div className="bg-white shadow-lg rounded p-8">{props.children}</div>
);

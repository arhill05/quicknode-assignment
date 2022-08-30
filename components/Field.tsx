export interface Props {
  label: string;
  value?: string | number;
}

export const Field = (props: Props) => (
  <div>
    <label
      className="font-semibold text-lg text-slate-600"
      htmlFor={props.label.toLowerCase().split(" ").join("-")}
    >
      {props.label}
    </label>
    <p>{props.value}</p>
  </div>
);

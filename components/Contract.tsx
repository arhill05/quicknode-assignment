import { ERC721Contract } from "../models/trending-collections";
import { Card } from "./Card";
import { Field } from "./Field";

export interface Props {
  contract: ERC721Contract;
}

export const Contract = ({ contract }: Props) => {
  const { totalSales, average, ceiling, floor, volume } = contract.stats;

  return (
    <Card>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl text-purple-800 font-bold">{contract.name}</h2>
        <p className="text-sm text-purple-400 font-semibold">{contract.symbol}</p>
      </div>
      <h3 className="text-xl text-purple-600">Stats</h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-2">
        <Field label="Total Sales" value={totalSales} />
        <Field label="Average" value={average} />
        <Field label="Ceiling" value={ceiling} />
        <Field label="Floor" value={floor} />
        <Field label="Volume" value={volume} />
      </div>
    </Card>
  );
};

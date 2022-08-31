import { ERC721Contract } from "../models/trending-collections";
import { Contract } from "./Contract";

export interface TrendingCollectionProps {
  trendingCollections?: ERC721Contract[];
  loading?: boolean;
}

export const TrendingCollections = ({
  trendingCollections,
  loading,
}: TrendingCollectionProps) => {
  const cards = trendingCollections?.map((contract) => {
    return <Contract contract={contract} key={contract.address} />;
  });
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">{cards}</div>
  );
};

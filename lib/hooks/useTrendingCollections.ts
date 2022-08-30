import { useQuery } from "@apollo/client";
import { GET_TRENDING_COLLECTIONS } from "../../graphql/getTrendingCollectionsQuery";
import { TrendingCollectionsQueryResult } from "../../models/trending-collections";

const useTrendingCollections = () => {
  const { loading, data } = useQuery<TrendingCollectionsQueryResult>(
    GET_TRENDING_COLLECTIONS
  );

  const trendingCollections = data?.trendingCollections.edges.map(
    (edges) => edges.node
  );
  return { loading, trendingCollections };
};

export default useTrendingCollections;

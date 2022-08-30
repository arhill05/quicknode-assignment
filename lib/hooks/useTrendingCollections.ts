import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";

const GET_TRENDING_COLLECTIONS = gql`
  query TrendingCollections {
    trendingCollections(orderBy: SALES, orderDirection: DESC) {
      edges {
        node {
          address
          ... on ERC721Contract {
            name
            stats {
              totalSales
              average
              ceiling
              floor
              volume
            }
            symbol
          }
        }
      }
    }
  }
`;

const useTrendingCollections = () => {
  const { loading, data } = useQuery<any, any>(GET_TRENDING_COLLECTIONS);
  return { loading, data };
};

export default useTrendingCollections;

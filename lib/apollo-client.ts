import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://graphql.icy.tools/graphql",
  cache: new InMemoryCache(),
  headers: { "x-api-key": process.env.NEXT_PUBLIC_ICY_API_KEY as string },
});

export default apolloClient;

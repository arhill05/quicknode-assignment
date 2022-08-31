import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import apolloClient from "../lib/apollo-client";
import {
  ERC721Contract,
  TrendingCollectionsQueryResult,
} from "../models/trending-collections";
import { GET_TRENDING_COLLECTIONS } from "../graphql/getTrendingCollectionsQuery";
import { AnchorText, Profile, TrendingCollections } from "../components";
import { IsConnectedGuard } from "../components/IsConnectedGuard";
import { useState } from "react";

interface SsrEnabledProps {
  trendingCollections: ERC721Contract[];
}

const SsrEnabled: NextPage<SsrEnabledProps> = ({ trendingCollections }) => {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const onUserConnectionChange = (isConnected: boolean) => {
    setIsUserConnected(isConnected);
  };
  return (
    <div className="bg-neutral-100 p-16">
      <Head>
        <title>Fetch Trending Collections | SSR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-screen-lg">
        <Profile onUserConnectionChange={onUserConnectionChange} />

        <div className="text-center mb-8">
          This page renders the trending collection data on using SSR.{" "}
          <Link href="/">
            <AnchorText>Click here</AnchorText>
          </Link>{" "}
          to view the page that fetches the same data on the client side.
        </div>

        <IsConnectedGuard isConnected={isUserConnected}>
          <TrendingCollections trendingCollections={trendingCollections} />
        </IsConnectedGuard>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const data = await apolloClient.query<TrendingCollectionsQueryResult>({
    query: GET_TRENDING_COLLECTIONS,
  });

  return {
    props: {
      trendingCollections: data.data.trendingCollections.edges.map(
        (edge) => edge.node
      ),
    },
  };
};

export default SsrEnabled;

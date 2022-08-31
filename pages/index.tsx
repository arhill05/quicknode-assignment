import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import useTrendingCollections from "../lib/hooks/useTrendingCollections";
import { AnchorText, Profile, TrendingCollections } from "../components";
import { useState } from "react";
import { IsConnectedGuard } from "../components/IsConnectedGuard";

const Home: NextPage = () => {
  const { loading, trendingCollections } = useTrendingCollections();
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
          This page fetches the trending collection data on the client side.{" "}
          <Link href="/ssr-enabled">
            <AnchorText>Click here</AnchorText>
          </Link>{" "}
          to view the page that renders the same data via SSR
        </div>
        <IsConnectedGuard isConnected={isUserConnected}>
          <TrendingCollections
            trendingCollections={trendingCollections}
            loading={loading}
          />
        </IsConnectedGuard>
      </main>
    </div>
  );
};

export default Home;

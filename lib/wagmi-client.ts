import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

import { publicProvider } from "wagmi/providers/public";

import { getDefaultProvider } from "ethers";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const wagmiClient = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
  ],
});

export default wagmiClient;

import { createClient, defaultChains, configureChains } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import { publicProvider } from "wagmi/providers/public";

import { getDefaultProvider } from "ethers";

const { chains } = configureChains(defaultChains, [publicProvider()]);

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
    // I don't have API keys for infura or alchemy, and these connectors do not support the default provider.
    // new InjectedConnector(),
    // new MetaMaskConnector({ chains }),
  ],
});

export default wagmiClient;

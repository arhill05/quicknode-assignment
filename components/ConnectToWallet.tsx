import { ConnectArgs } from "@wagmi/core";
import { Connector } from "wagmi";
import { Button } from "./Button";

export interface ConnectToWalletProps {
  connectors: Connector[];
  connect(args?: Partial<ConnectArgs>): any;
  isLoading: boolean;
  pendingConnector?: Connector;
  error?: Error | null;
}

export const ConnectToWallet = ({
  connectors,
  connect,
  isLoading,
  pendingConnector,
  error,
}: ConnectToWalletProps) => {
  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="mx-auto flex justify-center">
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            onClick={() => connect({ connector })}
            disabled={!connector.ready}
          >
            Connect to {connector.name}
            {!connector.ready && " (unsupported)"}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
          </Button>
        ))}
      </div>
      {error && <div className="text-red-700 font-bold">{error.message}</div>}
    </div>
  );
};

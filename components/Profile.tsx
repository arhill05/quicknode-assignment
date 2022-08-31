import Image from "next/image";
import { useEffect, useState, MouseEvent } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { Button } from "./Button";
import { ConnectedUser } from "./ConnectedUser";
import { ConnectToWallet } from "./ConnectToWallet";

export interface ProfileProps {
  onUserConnectionChange?(isConnected: boolean): void;
}

export function Profile({ onUserConnectionChange }: ProfileProps) {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const [isUserConnected, setIsUserConnected] = useState(false);

  // necessary to trigger a render after hydration because
  // the isConnected value is browser-specific
  useEffect(() => {
    setIsUserConnected(isConnected);
    if (onUserConnectionChange) {
      onUserConnectionChange(isConnected);
    }
  }, [isConnected, onUserConnectionChange]);

  const onDisconnectClick = (event: MouseEvent<HTMLButtonElement>) => {
    disconnect();
  };

  return isUserConnected ? (
    <div className="flex justify-between">
      <ConnectedUser
        address={address}
        ensName={ensName}
        connectorName={connector?.name}
        ensAvatar={ensAvatar}
      />
      <Button onClick={onDisconnectClick}>Disconnect</Button>
    </div>
  ) : (
    <ConnectToWallet
      connect={connect}
      connectors={connectors}
      error={error}
      isLoading={isLoading}
      pendingConnector={pendingConnector}
    />
  );
}

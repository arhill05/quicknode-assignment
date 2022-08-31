import { PropsWithChildren } from "react";

export interface IsConnectedGuardProps extends PropsWithChildren {
  isConnected?: boolean;
}

export const IsConnectedGuard = ({
  children,
  isConnected,
}: IsConnectedGuardProps) =>
  isConnected ? (
    <>{children}</>
  ) : (
    <div>You must have a wallet connected to view this content.</div>
  );

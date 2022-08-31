import Image from "next/image";

export interface ConnectedUserProps {
  ensAvatar?: string | null | undefined;
  ensName?: string | null | undefined;
  address?: string | null | undefined;
  connectorName?: string | null | undefined;
}

export const ConnectedUser = ({
  ensAvatar,
  ensName,
  address,
  connectorName,
}: ConnectedUserProps) => (
  <div className="flex">
    <div className="rounded mr-4 mb-4">
      <Image
        className="rounded m-12"
        src={ensAvatar ?? "https://www.fillmurray.com/100/100"}
        alt="ENS Avatar"
        height={100}
        width={100}
      />
    </div>
    <div>
      <div className="text-lg font-bold text-purple-700">
        {ensName ? `${ensName} (${address})` : address}
      </div>
      <div className="text-purple-400 font-semibold">
        Connected to {connectorName}
      </div>
    </div>
  </div>
);

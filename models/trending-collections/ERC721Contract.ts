import { ContractStats } from "./ContractStats";


export interface ERC721Contract {
  address: string;
  name: string;
  stats: ContractStats;
  symbol: string;
}

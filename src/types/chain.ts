import { ReactNode } from 'react';

export interface ChainType {
  chainId: number;
  name: string;
  rpc: string[];
  icon: ReactNode;
}

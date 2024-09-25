import { Token } from '@/types/swap.ts';

export interface PoolType {
  id: string;
  pairToken: Token;
  tokenA: Token;
  tokenB: Token;
  tvl: string;
  volume24h: string;
  volume1w: string;
  fees: string;
  chain_time: string;
}

export interface PoolAllInfo {
  tvl: string;
  volume24h: string;
}

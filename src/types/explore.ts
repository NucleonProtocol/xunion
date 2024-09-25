import { ActivityRecordType, SwapTransactionData } from './activity';
import { PoolType } from './pool';
import { Token } from './swap';

export enum Recently {
  day = 'day',
  weekly = 'weekly',
  monthly = 'monthly',
  year = 'year',
}
export interface TokenTVL {
  token: Token;
  amount: string;
  date: string;
}

export interface TokenVolume {
  token: Token;
  amount: string;
  date: string;
}

export interface TokenPrice {
  token: Token;
  amount: string;
  date: string;
}

export interface TokenTrade extends SwapTransactionData {
  type: ActivityRecordType.SWAP_TOKEN;
  sender?: string;
  totalPrice?: string;
}

export interface PairActivity extends PoolType {
  type: ActivityRecordType.ADD_LIQUIDITY | ActivityRecordType.REDUCE_LIQUIDITY;
  sender?: string;
  totalPrice?: string;
}

export interface PairTVL {
  token: Token;
  amount: string;
  date: string;
}

export interface PairVolume {
  token: Token;
  amount: string;
  date: string;
}

import { Token } from '@/types/swap.ts';

export interface SLCAsset extends Token {
  id: string;
  liq_penalty: string;
  max_deposit_amount: string;
  max_ltv?: string;
  balance?: number;
  balancePrice?: number;
  provided?: number;
  providedPrice?: number;
  canBeProvided?: boolean;
  canBeWithdraw?: boolean;
}

export enum BorrowMode {
  HighLiquidity,
  RiskIsolation,
}

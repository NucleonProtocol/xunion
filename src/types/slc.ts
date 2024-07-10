import { Token } from '@/types/swap.ts';

export interface SLCAsset extends Token {
  id: string;
  liq_penalty: string;
  max_deposit_amount: string;
  balance?: number;
  balancePrice?: number;
  provided?: number;
  providedPrice?: number;
  canBeProvided?: boolean;
}

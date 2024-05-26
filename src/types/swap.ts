import { ReactNode } from 'react';

export interface Token {
  symbol: string;
  name: string;
  price: string;
  address: string;
  icon: ReactNode;
  amount?: number;
}

export interface RateInfo {
  fromUnit: number;
  toUnit: number;
  usdt: number;
}

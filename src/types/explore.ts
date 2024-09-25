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

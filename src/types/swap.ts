export interface Token {
  decimals?: number;
  symbol?: string;
  name?: string;
  price?: number;
  address: string;
  icon?: string;
  amount?: number;
  chainId?: number;
}

export interface SwapRoute {
  route: Token[];
}

export interface Token {
  decimals?: number;
  symbol?: string;
  name?: string;
  price?: string;
  address: string;
  icon?: string;
  amount?: number;
  chainId?: number;
}

export interface CollateralAsset extends Token {
  balance: {
    amount: number;
    price: number;
  };
  provided: {
    amount: number;
    price: number;
  };
  canBeCollateral: boolean;
}

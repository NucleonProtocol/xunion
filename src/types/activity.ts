export enum ActivityRecordType {
  SEND_TOKEN = 'SEND_TOKEN',
  RECEIVED_TOKEN = 'RECEIVED_TOKEN',
  LIMIT = 'LIMIT',
  SWAP_TOKEN = 'SWAP_TOKEN',
  APPROVE_TOKEN = 'APPROVE_TOKEN',
  CREATE_POOL = 'CREATE_POOL',
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  REDUCE_LIQUIDITY = 'REDUCE_LIQUIDITY',
}

export interface Token {
  symbol: string;
  name: string;
  address: string;
  icon: string;
  decimals: number;
}
export interface SendTransactionData {
  sender: string;
  receiver: string;
  token: Token;
  amount: string;
}

export interface ReceivedTransactionData {
  sender: string;
  receiver: string;
  token: Token;
  amount: string;
}

// TODO
export interface LimitTransactionData {}

export interface AddLiquidityTransactionData {
  tokenA: Token & {
    amount: string;
    totalPrice: string;
  };
  tokenB: Token & {
    amount: string;
    totalPrice: string;
  };
  pairToken: Token & {
    amount: string;
    totalPrice: string;
  };
}

export interface ReduceLiquidityTransactionData {
  tokenA: Token & {
    amount: string;
    totalPrice: string;
  };
  tokenB: Token & {
    amount: string;
    totalPrice: string;
  };
  pairToken: Token & {
    amount: string;
    totalPrice: string;
  };
}

export interface CreatePoolTransactionData {
  tokenA: Token;
  tokenB: Token;
  pairAddress: string;
  isInitial: boolean;
}

export interface ApproveTransactionData {
  amount: string;
  token: Token;
  spenderAddress: string;
}

export interface SwapTransactionData {
  pay: {
    token: Token;
    amount: string;
  };
  received: {
    token: Token;
    amount: string;
  };
  route: Token[];
}

export interface ActivityRecord {
  ownerAddress: string;
  type: ActivityRecordType;
  hash: string;
  date: string;
  icon: string;
  txData:
    | SendTransactionData
    | ReceivedTransactionData
    | LimitTransactionData
    | SwapTransactionData
    | CreatePoolTransactionData
    | AddLiquidityTransactionData
    | ReduceLiquidityTransactionData
    | ApproveTransactionData;
}

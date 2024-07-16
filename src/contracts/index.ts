import SwapInterfaceABI from './abi/SwapInterface.json';
import SLCInterfaceABI from './abi/SLCInterface.json';
import iSlcOracleABI from './abi/iSlcOracle.json';
import Multicallespacetestnet from './abi/Multicallespacetestnet.json';
import { erc20Abi, isAddress } from 'viem';
import { getAddress } from 'ethers';
import { Token } from '@/types/swap.ts';
import { CHAIN_ID } from '@/components/Wallet/useWalletAuth.ts';

// export const E_SPACE_TEST_RPC =
//   'https://main.confluxrpc.com';
export const E_SPACE_TEST_RPC =
  'https://evmtestnet.confluxrpc.org/3zE8uVdvebDSL9KykwKqaDKUYXJiN7jGchiDfpr9Sgr4YqPWGNyi4X877wm7EeBbmtDwXXA3duVLYysoDP2EmD1hC';

// export const E_SPACE_TEST_RPC = 'https://evmtestnet.confluxrpc.org';

export const E_SPACE_MAIN_RPC = 'https://evm.confluxrpc.org';

//   test net
export const XUNION_SWAP_CONTRACT = {
  interface: {
    address: '0x1E1A2bA16a6F6f76e9b9F2f575f2D321CAA1CE8C',
    abi: SwapInterfaceABI,
  },
  slc: {
    address: '0x84A1894b366a2346D92a7a57D4150Ee08aaf3423',
    abi: erc20Abi,
  },
  usdt: {
    address: '0x4a64578C034bbb338b4A78151F5e26A85D6ABeD6',
    abi: erc20Abi,
  },
};

export const XUNION_SLC_CONTRACT = {
  interface: {
    address: '0x3432c540B042FD8c7F8bc11c0f179624b0c51e3F',
    abi: SLCInterfaceABI,
  },
  oracle: {
    address: '0x559465367614e385Bd85c00a1B573414960763a5',
    abi: iSlcOracleABI,
  },
  mutilCall: {
    address: '0x399b446909DC916C62D741060E709D8FCA785e0A',
    abi: Multicallespacetestnet,
  },
};

export const NATIVE_TOKENS: Record<number, string> = {
  // main net
  1: 'ETH',
  56: 'BNB',
  137: 'MATIC',
  //test net
  71: 'CFX',
};

export const NATIVE_GAS_TOKENS: Record<number, string> = {
  // main net
  1: 'ETH',
  56: 'BNB',
  137: 'MATIC',
  //test net
  71: '0x16C2473A9957d00B832C27cFa34773721f47992e',
};
export const NATIVE_SWAP_TOKENS: Record<number, string> = {
  // main net
  1: '0x0000000000000000000000000000000000000et0',
  56: 'BNB',
  137: 'MATIC',
  //test net
  71: '0x0000000000000000000000000000000000000cf0',
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const isSLCToken = (address: string) => {
  return (
    isAddress(address) &&
    getAddress(address).toLowerCase() ===
      getAddress(XUNION_SWAP_CONTRACT.slc.address).toLowerCase()
  );
};

export const SLCToken: Token = {
  address: XUNION_SWAP_CONTRACT.slc.address,
  symbol: 'SLC',
  decimals: 18,
  chainId: CHAIN_ID,
  name: 'SLC',
  icon: 'http://testapi.artixv.com/coin/SLC-logo.png',
};

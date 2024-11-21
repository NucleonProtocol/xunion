import SwapInterfaceABI from './abi/SwapInterface.json';
import SLCInterfaceABI from './abi/SLCInterface.json';
import iSlcOracleABI from './abi/iSlcOracle.json';
import Multicallespacetestnet from './abi/Multicallespacetestnet.json';
import LendingInterfaceABI from './abi/LendingInterface.json';
import { Abi, Address, erc20Abi, isAddress } from 'viem';
import { getAddress, InterfaceAbi } from 'ethers';
import { Token } from '@/types/swap.ts';
import { CHAIN_ID } from '@/components/Wallet/useWalletAuth.ts';

export const XUNION_LENDING_CONTRACT: Record<
  'interface',
  { address: Address; abi: InterfaceAbi | Abi | any }
> = {
  interface: {
    address: '0x00b88C1149CB6150121953262E4f271DCc1923D1',
    abi: LendingInterfaceABI,
  },
};

export const XUNION_SWAP_CONTRACT: Record<
  'interface' | 'slc' | 'usdt' | 'usdc',
  { address: Address; abi: InterfaceAbi | Abi | any }
> = {
  interface: {
    address: '0xC00FBD5bbEF47185A6BB0CBea6DcE755fcD718b1',
    abi: SwapInterfaceABI,
  },
  // // main
  // slc: {
  //   address: '0xF65050e2AC003569a4b18E612B86CC833afE5960',
  //   abi: erc20Abi,
  // },
  // // main
  // usdt: {
  //   address: '0xfe97E85d13ABD9c1c33384E796F10B73905637cE',
  //   abi: erc20Abi,
  // },
  // // main
  // usdc: {
  //   address: '0x6963EfED0aB40F6C3d7BdA44A05dcf1437C44372',
  //   abi: erc20Abi,
  // },
  // testnet
  slc: {
    address: '0x8c4B892AF3655eAE24cf426c4D242Ab95bc3903D',
    abi: erc20Abi,
  },
  // testnet
  usdt: {
    address: '0x27Fc32d2AD515c9AFE5e6c8434B32053ce0b042B',
    abi: erc20Abi,
  },
  // testnet
  usdc: {
    address: '0xcB12b404c3Ed1bB67d9Bd6ca044283497a8eB18a',
    abi: erc20Abi,
  },
};

export const XUNION_SLC_CONTRACT: Record<
  'interface' | 'oracle' | 'mutilCall',
  { address: Address; abi: InterfaceAbi | Abi | any }
> = {
  // testnet
  interface: {
    address: '0x2bDeab5D4664Fa5602De7e0e7d3416AFF44aa12D',
    abi: SLCInterfaceABI,
  },
  // // main
  // interface: {
  //   address: '',
  //   abi: SLCInterfaceABI,
  // },
  oracle: {
    address: '0x280fC0D155ABf8cdD5341c9e7CbED669E9A3D466',
    abi: iSlcOracleABI,
  },
  mutilCall: {
    address: '0xFF8fB8a62B70e025C07B066D34FAb28277260391',
    abi: Multicallespacetestnet,
  },
};

export const NATIVE_ERC20_TOKEN: Record<string, Token> = {
  71: {
    address: '0x26efCdC7adA14EcAf755557cc62f4FD7757586CC',
    symbol: 'WXCFX',
    name: 'WXCFX',
    decimals: 18,
  },
  1_030: {
    address: '0x26efCdC7adA14EcAf755557cc62f4FD7757586CC',
    symbol: 'CFX',
    name: 'CFX',
    decimals: 18,
  },
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
  symbol: 'xUSD',
  decimals: 18,
  chainId: CHAIN_ID,
  name: 'X Libra USD',
  icon: 'https://espacemainnetapi.xunion.io/coin/xUSD.png',
};

export const USDTToken: Token = {
  address: XUNION_SWAP_CONTRACT.usdt.address,
  name: 'Tether USD',
  symbol: 'USDT',
  icon: 'https://espacemainnetapi.xunion.io/coin/1728405426994.png',
  decimals: 18,
};

export const USDCToken: Token = {
  address: XUNION_SWAP_CONTRACT.usdc.address,
  name: 'USD Coin',
  symbol: 'USDC',
  icon: 'https://espacemainnetapi.xunion.io/coin/1728402879785.png',
  decimals: 18,
};

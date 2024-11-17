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
    address: '0x7BacA12e34C3ecac96EDd42ba18fe3749bEB1835',
    abi: LendingInterfaceABI,
  },
};

export const XUNION_SWAP_CONTRACT: Record<
  'interface' | 'slc' | 'usdt',
  { address: Address; abi: InterfaceAbi | Abi | any }
> = {
  interface: {
    address: '0xC00FBD5bbEF47185A6BB0CBea6DcE755fcD718b1',
    abi: SwapInterfaceABI,
  },
  slc: {
    address: '0xF65050e2AC003569a4b18E612B86CC833afE5960',
    abi: erc20Abi,
  },
  usdt: {
    address: '0xfe97E85d13ABD9c1c33384E796F10B73905637cE',
    abi: erc20Abi,
  },
};

export const XUNION_SLC_CONTRACT: Record<
  'interface' | 'oracle' | 'mutilCall',
  { address: Address; abi: InterfaceAbi | Abi | any }
> = {
  interface: {
    address: '0xabD9999dE5De626Af8Bb224c700b87D3954273AF',
    abi: SLCInterfaceABI,
  },
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

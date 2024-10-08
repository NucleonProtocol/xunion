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
    address: '0x45168c9e8D5d52e36fcbaCD64826f4e549696CA5',
    abi: LendingInterfaceABI,
  },
};

export const XUNION_SWAP_CONTRACT: Record<
  'interface' | 'slc' | 'usdt',
  { address: Address; abi: InterfaceAbi | Abi | any }
> = {
  interface: {
    address: '0xD3C5c8B9439E84ad42c20716c335974822BC211a',
    abi: SwapInterfaceABI,
  },
  slc: {
    address: '0x8c4B892AF3655eAE24cf426c4D242Ab95bc3903D',
    abi: erc20Abi,
  },
  usdt: {
    address: '0x27Fc32d2AD515c9AFE5e6c8434B32053ce0b042B',
    abi: erc20Abi,
  },
};

export const XUNION_SLC_CONTRACT: Record<
  'interface' | 'oracle' | 'mutilCall',
  { address: Address; abi: InterfaceAbi | Abi | any }
> = {
  interface: {
    address: '0x35D62688056D543ADfb78971ebe13250129ab2Cd',
    abi: SLCInterfaceABI,
  },
  oracle: {
    address: '0x945dbfdd972B5628AB9235BF28E68Eb59aF98703',
    abi: iSlcOracleABI,
  },
  mutilCall: {
    address: '0x399b446909DC916C62D741060E709D8FCA785e0A',
    abi: Multicallespacetestnet,
  },
};

export const NATIVE_ERC20_TOKEN: Record<string, Token> = {
  71: {
    address: '0x16C2473A9957d00B832C27cFa34773721f47992e',
    symbol: 'WXCFX',
    name: 'WXCFX',
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
  symbol: 'SLC',
  decimals: 18,
  chainId: CHAIN_ID,
  name: 'SLC',
  icon: 'http://testapi.artixv.com/coin/SLC-logo.png',
};

import interfaceABI from './xUnionSwapUserInterface.json';
import { erc20Abi, isAddress } from 'viem';
import { getAddress } from 'ethers';

// export const E_SPACE_TEST_RPC =
//   'https://main.confluxrpc.com';
export const E_SPACE_TEST_RPC =
  'https://evmtestnet.confluxrpc.org/3zE8uVdvebDSL9KykwKqaDKUYXJiN7jGchiDfpr9Sgr4YqPWGNyi4X877wm7EeBbmtDwXXA3duVLYysoDP2EmD1hC';

// export const E_SPACE_TEST_RPC = 'https://evmtestnet.confluxrpc.org';

export const E_SPACE_MAIN_RPC = 'https://evm.confluxrpc.org';

//   test net
export const XUNION_SWAP_CONTRACT = {
  factory: {
    address: '0x3A9d595D7130145955097b1B304CA735f13e200C',
    abi: [],
  },
  vaults: {
    address: '0xd823a46F3c905958c0CE4fB55d742492D344E510',
    abi: [],
  },
  lpvaults: {
    address: '0xfD9fE7A26FE6D26aa82Ec654B653bd75d078bB10',
    abi: [],
  },
  lpmanager: {
    address: '0xc640458bcC2a4fF9DE87838f9097563313a154D5',
    abi: [],
  },
  core: {
    address: '0x62594F9309068527563459539713DFAAde6c544A',
    abi: [],
  },
  interface: {
    address: '0xE973d4ae8A80B4E7Cce49Cc847A36895D1CaabA6',
    abi: interfaceABI,
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

export const isSLCToken = (address: string) => {
  return (
    isAddress(address) &&
    getAddress(address).toLowerCase() ===
      getAddress(XUNION_SWAP_CONTRACT.slc.address).toLowerCase()
  );
};

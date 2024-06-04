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
    address: '0x322725e74D8ce7E3Fa06E0219883Ee4ca627Fb0A',
    abi: [],
  },
  vaults: {
    address: '0x7Cf4bdf8b9c7419A7FAaFC82C5DAEb30a3d6C8E3',
    abi: [],
  },
  lpvaults: {
    address: '0x2436Ae533baa7e1cf01062B62E6c926C9D78d3B4',
    abi: [],
  },
  lpmanager: {
    address: '0xba0c9221da0207b49D35dEf9fc064B7d967417c1',
    abi: [],
  },
  core: {
    address: '0x96b491AD541F0fa558DbCb107bCD8F400C1B1BCa',
    abi: [],
  },
  interface: {
    address: '0x9698e25746195ba599be46a065281888964e7468',
    abi: interfaceABI,
  },
  slc: {
    address: '0x4dAfEa49A8F138F2Aaf20B8Abe67Ec56200c3073',
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

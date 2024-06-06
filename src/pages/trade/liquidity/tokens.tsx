import { Token } from '@/types/swap.ts';
import { ADAIcon, CFXIcon, ETHIcon } from '@/components/icons/tokens';

export const recommends: Token[] = [
  {
    symbol: 'BTC',
    name: 'BTC',
    icon: <ETHIcon />,
    address: '0x7CBf5971d740b9f8eB957D8b3a07617fCd2AF36E',
    price: '200.00',
    amount: 0,
  },
  {
    symbol: 'ETH',
    name: 'ETH',
    icon: <ETHIcon />,
    address: '0x503bcbf7AE3ae9D32E8aA57ff2EF1dDB145e651e',
    price: '200.00',
    amount: 0,
  },
  {
    symbol: 'USDT',
    name: 'USDT',
    icon: <ADAIcon />,
    address: '0x4a64578C034bbb338b4A78151F5e26A85D6ABeD6',
    price: '1.002',
    amount: 0,
  },
  {
    symbol: 'USDC',
    name: 'USDC',
    icon: <ADAIcon />,
    address: '0x653d07E59d7FEb93F0c0199a12dA6730845D6a68',
    price: '1.002',
    amount: 0,
  },
  {
    symbol: 'CFX',
    name: 'CFX Coin',
    icon: <CFXIcon />,
    address: '0x1955Aa7e1Dd90CBc403bbf0D737cBdf6623d6E7a',
    price: '0.402',
    amount: 0,
  },
  {
    symbol: 'SxCFX',
    name: 'Sx CFX',
    icon: <CFXIcon />,
    address: '0xA6B62F612eA4C51a518D9FfC6EE061B31E7e7362',
    price: '0.402',
    amount: 0,
  },
  {
    symbol: 'SLC',
    name: 'Slc',
    icon: <CFXIcon />,
    address: '0x4dAfEa49A8F138F2Aaf20B8Abe67Ec56200c3073',
    price: '0.402',
    amount: 0,
  },
  {
    symbol: 'XUN',
    name: 'Xun',
    icon: <CFXIcon />,
    address: '0x52AB22cD62bB50509A30f04A09b13003FC5EeCf8',
    price: '0.402',
    amount: 0,
  },
];

import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { Button } from 'antd';
import { usePersistStore } from '@/store/persist.ts';
import useWalletStore from '@/store/wallet.ts';

const CHAIN_ID = 71; //eSpace testnet
// const CHAIN_ID = 1_030; //eSpace main

export enum BUTTON_ACCESS {
  'TOKEN',
  'CONNECTED',
  'WHITELIST',
  'CHAIN',
}

const WithAuthButton = ({
  onClick,
  children,
  access = [BUTTON_ACCESS.CONNECTED, BUTTON_ACCESS.CHAIN],
  ...props
}: HTMLAttributes<HTMLElement> &
  PropsWithChildren<{ access?: BUTTON_ACCESS[] }>) => {
  const { switchChain } = useSwitchChain();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { address } = useAccount();
  const wallet = usePersistStore((state) => state.wallet);
  const onOpen = useWalletStore((state) => state.onOpen);
  const walletConnected =
    wallet &&
    !(!isConnected && !address && access.includes(BUTTON_ACCESS.CONNECTED));

  console.log(chainId, CHAIN_ID);

  const isErrorNetwork =
    chainId !== CHAIN_ID && access.includes(BUTTON_ACCESS.CHAIN);

  const child = children;
  const onAuthClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!walletConnected) {
      onOpen(true);
      return;
    }

    if (isErrorNetwork) {
      switchChain({ chainId: CHAIN_ID });
      return;
    }

    onClick?.(e);
  };

  if (!walletConnected) {
    return React.cloneElement(
      <span />,
      { ...props, onClick: onAuthClick },
      <Button size="large" className=" w-full  bg-theme-non-opaque text-theme">
        Connect Wallet
      </Button>
    );
  }

  if (isErrorNetwork) {
    return React.cloneElement(
      <span />,
      { ...props, onClick: onAuthClick },
      <Button className="w-full" size="large" danger>
        Swatch network
      </Button>
    );
  }

  return React.cloneElement(
    <span />,
    { ...props, onClick: onAuthClick },
    child
  );
};

export default WithAuthButton;

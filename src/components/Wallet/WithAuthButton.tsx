import React, { HTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import { useSwitchChain } from 'wagmi';
import { Button } from 'antd';
import useWalletStore from '@/store/wallet.ts';
import useWalletAuth from '@/components/Wallet/useWalletAuth.ts';
import { BUTTON_ACCESS } from '@/types/auth.ts';

const WithAuthButton = ({
  children,
  access = [BUTTON_ACCESS.CONNECTED, BUTTON_ACCESS.CHAIN],
  ...props
}: HTMLAttributes<HTMLElement> &
  PropsWithChildren<{ access?: BUTTON_ACCESS[]; disabled?: boolean }>) => {
  const { switchChain } = useSwitchChain();

  const { walletConnected, isErrorNetwork, CHAIN_ID } = useWalletAuth(access);
  const onOpen = useWalletStore((state) => state.onOpen);

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
  };

  if (!walletConnected) {
    return (
      <Button
        size="large"
        className=" h-[56px] w-full bg-theme-non-opaque text-theme"
        {...props}
        onClick={onAuthClick}
      >
        Connect Wallet
      </Button>
    );
  }

  if (isErrorNetwork) {
    return (
      <Button
        className="h-[56px]  w-full border-0 bg-status-error-non-opaque hover:!bg-status-error-non-opaque"
        size="large"
        {...props}
        onClick={onAuthClick}
        danger
      >
        Switch network
      </Button>
    );
  }

  return React.cloneElement(child as ReactElement, {
    ...props,
  });
};

export default WithAuthButton;

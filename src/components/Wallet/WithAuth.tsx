import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';

const CHAIN_ID = 1;

export enum BUTTON_ACCESS {
  'TOKEN',
  'CONNECTED',
  'WHITELIST',
  'CHAIN',
}

const WithAuth = ({
  onClick,
  children,
  access = [BUTTON_ACCESS.CONNECTED, BUTTON_ACCESS.CHAIN],
  ...props
}: HTMLAttributes<HTMLElement> &
  PropsWithChildren<{ access?: BUTTON_ACCESS[] }>) => {
  const { switchChain } = useSwitchChain();
  const { isConnected } = useAccount();
  const { address, chainId } = useAccount();

  const walletConnected = !(
    !isConnected &&
    !address &&
    access.includes(BUTTON_ACCESS.CONNECTED)
  );

  const isErrorNetwork =
    chainId !== CHAIN_ID && access.includes(BUTTON_ACCESS.CHAIN);

  const child = children;
  const onAuthClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!walletConnected) {
      // TODO  open connect modal
      return;
    }

    if (isErrorNetwork) {
      switchChain({ chainId: CHAIN_ID });
      return;
    }

    onClick?.(e);
  };

  return React.cloneElement(
    <span />,
    { ...props, onClick: onAuthClick },
    child
  );
};

export default WithAuth;

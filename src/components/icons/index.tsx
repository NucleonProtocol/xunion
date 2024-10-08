/// <reference types="vite-plugin-svgr/client" />
import { cn } from '@/utils/classnames.ts';
import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import AntdIcon from '@ant-design/icons';
import LogoSvg from '@/assets/svgs/external/logo.svg?react';
import CreatePool from '@/assets/svgs/other/create-pool.svg?react';
import Pools from '@/assets/svgs/other/pools.svg?react';
import Swap from '@/assets/svgs/other/swap.svg?react';
import Liquidity from '@/assets/svgs/other/liquidity.svg?react';
import Metamask from '@/assets/svgs/external/Metamask.svg?react';
import Coinbase from '@/assets/svgs/external/coinbase.svg?react';
import WalletConnect from '@/assets/svgs/external/wallet-connect.svg?react';
import BrowserWallet from '@/assets/svgs/external/browser-wallet.svg?react';
import OKXWallet from '@/assets/svgs/external/okx-wallet.svg?react';
import Fluent from '@/assets/svgs/external/fluent.svg?react';
import Avatar from '@/assets/svgs/other/avatar.svg?react';
import Setting from '@/assets/svgs/menus/setting.svg?react';
import ArrowRightTop from '@/assets/svgs/arrow/arrow-right-top.svg?react';
import ArrowUp from '@/assets/svgs/arrow/arrow-up.svg?react';
import ArrowLeft from '@/assets/svgs/arrow/arrow-left.svg?react';
import BuySell from '@/assets/svgs/menus/buy-sell.svg?react';
import Borrow from '@/assets/svgs/menus/Borrow.svg?react';
import Exchange from '@/assets/svgs/other/exchange.svg?react';
import SlowmoSvg from '@/assets/svgs/status/slowmo.svg?react';

export type IconProps = PropsWithChildren<
  {
    className?: string;
    style?: CSSProperties;
  } & HTMLAttributes<HTMLElement>
>;

export type IconFn = (props: IconProps) => JSX.Element;

export const Icon = ({ className, style, children, ...props }: IconProps) => {
  return (
    <AntdIcon className={className} style={style} {...props}>
      {children}
    </AntdIcon>
  );
};

export const LogoIcon = (props: IconProps) => (
  <Icon {...props}>
    <LogoSvg />
  </Icon>
);

export const CreatePoolIcon = (props: IconProps) => (
  <Icon {...props}>
    <CreatePool />
  </Icon>
);

export const PoolsIcon = (props: IconProps) => (
  <Icon {...props}>
    <Pools />
  </Icon>
);

export const SwapIcon = (props: IconProps) => (
  <Icon {...props}>
    <Swap />
  </Icon>
);

export const LiquidityIcon = (props: IconProps) => (
  <Icon {...props}>
    <Liquidity />
  </Icon>
);

export const MetamaskIcon = (props: IconProps) => (
  <Icon {...props}>
    <Metamask />
  </Icon>
);

export const WalletConnectIcon = (props: IconProps) => (
  <Icon {...props}>
    <WalletConnect />
  </Icon>
);
export const CoinbaseIcon = (props: IconProps) => (
  <Icon {...props}>
    <Coinbase />
  </Icon>
);
export const BrowserWalletIcon = (props: IconProps) => (
  <Icon {...props}>
    <BrowserWallet />
  </Icon>
);

export const FluentIcon = (props: IconProps) => (
  <Icon {...props}>
    <Fluent />
  </Icon>
);
export const OKXWalletIcon = (props: IconProps) => (
  <Icon {...props}>
    <OKXWallet />
  </Icon>
);

export const AvatarIcon = (props: IconProps) => (
  <Icon {...props}>
    <Avatar />
  </Icon>
);

export const SettingIcon = (props: IconProps) => (
  <Icon {...props}>
    <Setting />
  </Icon>
);

export const ArrowRightTopIcon = (props: IconProps) => (
  <Icon {...props}>
    <ArrowRightTop />
  </Icon>
);
export const ArrowUpIcon = (props: IconProps) => (
  <Icon {...props}>
    <ArrowUp />
  </Icon>
);
export const ArrowLeftIcon = (props: IconProps) => (
  <Icon {...props}>
    <ArrowLeft />
  </Icon>
);
export const TokenIcon = ({
  src,
  className,
  width,
  height,
  name = 'X',
  ...rest
}: {
  src?: string;
  className?: string;
  width?: number;
  height?: number;
  name?: string;
} & IconProps) =>
  src ? (
    <img
      src={src}
      alt=""
      className={cn('inline-block h-[20px] w-[20px] rounded-full', className)}
      style={{
        width,
        height,
      }}
    />
  ) : (
    <span
      style={{
        width,
        height,
      }}
      className={cn(
        'flex h-[25px] w-[25px] items-center justify-center rounded-full border border-theme p-[5px] text-[16px]  font-bold text-theme',
        className
      )}
      {...rest}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );

export const BuySellIcon = (props: IconProps) => (
  <Icon {...props}>
    <BuySell />
  </Icon>
);

export const BorrowIcon = (props: IconProps) => (
  <Icon {...props}>
    <Borrow />
  </Icon>
);
export const ExchangeIcon = (props: IconProps) => (
  <Icon {...props}>
    <Exchange />
  </Icon>
);
export const SpinIcon = ({ className, ...props }: IconProps) => (
  <Icon {...props} className={cn('animate-spin text-[16px]', className)}>
    <SlowmoSvg />
  </Icon>
);

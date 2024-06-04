/// <reference types="vite-plugin-svgr/client" />
import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import AntdIcon from '@ant-design/icons';
import LogoSvg from '@/assets/svgs/external/logo.svg?react';
import CreatePool from '@/assets/svgs/other/create-pool.svg?react';
import Pools from '@/assets/svgs/other/pools.svg?react';
import Swap from '@/assets/svgs/other/swap.svg?react';
import Liquidity from '@/assets/svgs/other/liquidity.svg?react';
import Metamask from '@/assets/svgs/external/Metamask.svg?react';
import Fluent from '@/assets/svgs/external/fluent.svg?react';
import Avatar from '@/assets/svgs/other/avatar.svg?react';
import Setting from '@/assets/svgs/menus/setting.svg?react';
import ArrowRightTop from '@/assets/svgs/arrow/arrow-right-top.svg?react';
import ArrowUp from '@/assets/svgs/arrow/arrow-up.svg?react';
import ArrowLeft from '@/assets/svgs/arrow/arrow-left.svg?react';

type IconProps = PropsWithChildren<
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

export const FluentIcon = (props: IconProps) => (
  <Icon {...props}>
    <Fluent />
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

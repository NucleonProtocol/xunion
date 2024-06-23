/// <reference types="vite-plugin-svgr/client" />
import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import AntdIcon from '@ant-design/icons';
import ADA from '@/assets/svgs/tokens/ADA.svg?react';
import CFX from '@/assets/svgs/tokens/CFX (Conflux.svg?react';
import ETH from '@/assets/svgs/tokens/ETH-Ethereum.svg?react';
import OP from '@/assets/svgs/tokens/OP (Optimism.svg?react';
import Exchange from '@/assets/svgs/other/exchange.svg?react';
import SlowmoSvg from '@/assets/svgs/status/slowmo.svg?react';
import { cn } from '@/utils/classnames.ts';

type IconProps = PropsWithChildren<
  {
    className?: string;
    style?: CSSProperties;
  } & HTMLAttributes<HTMLElement>
>;

export const Icon = ({ className, style, children, ...props }: IconProps) => {
  return (
    <AntdIcon className={className} style={style} {...props}>
      {children}
    </AntdIcon>
  );
};

export const ADAIcon = (props: IconProps) => (
  <Icon {...props}>
    <ADA />
  </Icon>
);

export const CFXIcon = (props: IconProps) => (
  <Icon {...props}>
    <CFX />
  </Icon>
);

export const ETHIcon = (props: IconProps) => (
  <Icon {...props}>
    <ETH />
  </Icon>
);

export const OPIcon = (props: IconProps) => (
  <Icon {...props}>
    <OP />
  </Icon>
);
export const ExchangeIcon = (props: IconProps) => (
  <Icon {...props}>
    <Exchange />
  </Icon>
);

export const SpinIcon = ({ className, ...props }: IconProps) => (
  <Icon {...props} className={cn('animate-spin', className)}>
    <SlowmoSvg />
  </Icon>
);

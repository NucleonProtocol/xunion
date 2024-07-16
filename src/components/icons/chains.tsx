/// <reference types="vite-plugin-svgr/client" />

import ESpace from '@/assets/svgs/chains/eSpace.svg?react';
import Scroll from '@/assets/svgs/chains/scroll.svg?react';
import { Icon, IconProps } from '@/components/icons/index.tsx';

export const ESpaceIcon = (props: IconProps) => (
  <Icon {...props}>
    <ESpace />
  </Icon>
);

export const ScrollIcon = (props: IconProps) => (
  <Icon {...props}>
    <Scroll />
  </Icon>
);

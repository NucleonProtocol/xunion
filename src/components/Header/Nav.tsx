import { Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  CreatePoolIcon,
  LiquidityIcon,
  PoolsIcon,
  SwapIcon,
} from '@/components/icons';
import { ReactElement, useState } from 'react';
import { cn } from '@/utils/classnames.ts';

const MenuItem = ({
  item,
}: {
  item: { icon: ReactElement; name: string; description: string; path: string };
}) => {
  return (
    <Link to={item.path} className="flex items-center px-[16px] py-[8px]">
      <div className="pr-[20px] text-[24px]">{item.icon}</div>
      <div className="flex flex-col">
        <span className="text-[16px] ">{item.name}</span>
        <span className="text-[14px] text-tc-secondary">
          {item.description}
        </span>
      </div>
    </Link>
  );
};

const menus = [
  {
    name: 'Swap',
    description: 'The most user-friendly way to trade',
    path: '/trade/swap',
    icon: <SwapIcon />,
  },
  {
    name: 'Liquidity',
    description: 'Put your funds to work for earning',
    path: '/trade/liquidity',
    icon: <LiquidityIcon />,
  },
  {
    name: 'Create Pool',
    description: 'Create and manage your pool',
    path: '/trade/create-pool',
    icon: <CreatePoolIcon />,
  },
  {
    name: 'Pools',
    description: 'Find and join the top pools',
    path: '/trade/pools',
    icon: <PoolsIcon />,
  },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const items: MenuProps['items'] = menus.map((item) => ({
    label: <MenuItem item={item} />,
    key: item.name,
  }));

  return (
    <div className="flex items-center gap-[20px] text-[16px]">
      <Dropdown menu={{ items }} trigger={['hover']} onOpenChange={setOpen}>
        <div className="flex cursor-pointer items-center gap-[10px] px-[12px]">
          Trade
          <DownOutlined
            className={cn(
              'rotate-0 text-[12px] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]',
              { 'rotate-180': open }
            )}
          />
        </div>
      </Dropdown>

      <Link to={'/'} className="px-[12px]  text-tc-secondary">
        SLC
      </Link>
      <Link to={'/'} className="px-[12px] text-tc-secondary">
        Explore
      </Link>
    </div>
  );
};

export default Nav;

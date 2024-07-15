import { Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/utils/classnames.ts';
import { LogoIcon } from '@/components/icons';
const menus = [
  {
    name: 'X-Dex',
    description: 'The most user-friendly dex to trade',
    path: '/x-dex',
    mather: (pathname: string) => pathname.includes('/x-dex'),
    children: [
      {
        name: 'Swap',
        path: '/x-dex/swap',
        mather: (pathname: string) => pathname.includes('/x-dex/swap'),
      },
      {
        name: 'Pools',
        path: '/x-dex/pools',
        mather: (pathname: string) => pathname.includes('/x-dex/pools'),
      },
      {
        name: 'Explore',
        path: '/x-dex/explore',
        mather: (pathname: string) => pathname.includes('/x-dex/explore'),
      },
    ],
  },
  {
    name: 'X-Super Libra Coin',
    description: 'A decentralized super stable coin',
    path: '/x-super-libra-coin',
    mather: (pathname: string) => pathname.includes('/x-super-libra-coin'),
    children: [],
  },
  {
    name: 'X-Lending',
    description: 'Borrow, lend and earn',
    path: '/x-lending',
    mather: (pathname: string) => pathname.includes('/x-lending'),
    children: [
      {
        name: 'Dashboard',
        path: '/x-lending/dashboard',
        mather: (pathname: string) => pathname.includes('/x-lending/dashboard'),
      },
      {
        name: 'Market',
        path: '/x-lending/market',
        mather: (pathname: string) => pathname.includes('/x-lending/market'),
      },
    ],
  },
];

const MenuItem = ({
  item,
}: {
  item: { name: string; description: string; path: string };
}) => {
  return (
    <Link to={item.path} className="flex items-center px-[16px] py-[8px]">
      <div className="flex flex-col">
        <span className="text-[16px] ">{item.name}</span>
        <span className="text-[14px] text-tc-secondary">
          {item.description}
        </span>
      </div>
    </Link>
  );
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const items: MenuProps['items'] = menus.map((item) => ({
    label: <MenuItem item={item} />,
    key: item.name,
  }));

  const { pathname } = useLocation();

  const menu = menus.find((item) => item.mather(pathname));

  return (
    <div className="flex items-center gap-[40px] text-[16px] max-md:flex-1 max-md:justify-start max-md:gap-[10px]">
      <div className="flex-center">
        <LogoIcon className="text-[40px] max-md:hidden" />
        <Dropdown menu={{ items }} trigger={['click']} onOpenChange={setOpen}>
          <div className="flex cursor-pointer items-center gap-[10px] px-[12px]">
            <span className="font-bold">{menu?.name}</span>
            <DownOutlined
              className={cn(
                'rotate-0 text-[14px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]',
                { 'rotate-180': open }
              )}
            />
          </div>
        </Dropdown>
      </div>
      <div className="flex-center gap-[30px]">
        {menu?.children.map((child) => (
          <Link
            key={child.path}
            to={child.path}
            className={cn('px-[12px]  text-tc-secondary max-md:px-[8px]', {
              'text-tc-primary': child.mather(pathname),
            })}
          >
            {child.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nav;

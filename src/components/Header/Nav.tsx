import { Dropdown, MenuProps, theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/utils/classnames.ts';
import { LogoIcon } from '@/components/icons';
import { useTranslate } from '@/i18n';
import React from 'react';
import Audited from '@/components/Header/Audited';

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

  const { t } = useTranslate();

  const menus = [
    {
      name: t('common.nav.x-dex'),
      description: t('common.nav.x-dex.description'),
      path: '/x-dex',
      mather: (pathname: string) => pathname.includes('/x-dex'),
      children: [
        {
          name: t('x-dex.swap.title'),
          path: '/x-dex/swap',
          mather: (pathname: string) =>
            pathname.includes('/x-dex/swap') ||
            pathname.includes('/x-dex/liquidity') ||
            pathname.includes('/x-dex/send') ||
            pathname.includes('/x-dex/limit'),
        },
        {
          name: t('x-dex.pools.label'),
          path: '/x-dex/pools',
          mather: (pathname: string) => pathname.includes('/x-dex/pools'),
        },
        {
          name: t('common.nav.x-dex.explore'),
          path: '/x-dex/explore',
          mather: (pathname: string) => pathname.includes('/x-dex/explore'),
        },
      ],
    },
    {
      name: t('common.nav.x-super-libra-coin'),
      description: t('common.nav.x-super-libra-coin.description'),
      path: '/x-super-libra-coin',
      mather: (pathname: string) => pathname.includes('/x-super-libra-coin'),
      children: [],
    },
    {
      name: t('common.nav.x-lending'),
      description: t('common.nav.x-lending.description'),
      path: '/x-lending',
      mather: (pathname: string) => pathname.includes('/x-lending'),
      children: [
        {
          name: t('common.nav.x-lending.dashboard'),
          path: '/x-lending/dashboard',
          mather: (pathname: string) =>
            pathname.includes('/x-lending/dashboard'),
        },
        {
          name: t('common.nav.x-lending.market'),
          path: '/x-lending/market',
          mather: (pathname: string) => pathname.includes('/x-lending/market'),
        },
      ],
    },
  ];

  const items: MenuProps['items'] = menus.map((item) => ({
    label: <MenuItem item={item} />,
    key: item.name,
  }));

  const { pathname } = useLocation();

  const menu = menus.find((item) => item.mather(pathname));
  const { token } = theme.useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  return (
    <div className="flex items-center gap-[40px] text-[16px] max-md:flex-1 max-md:justify-start max-md:gap-[5px] max-md:text-[14px]">
      <div className="flex-center">
        <LogoIcon className="text-[40px] max-md:hidden" />
        <Dropdown
          menu={{
            items: [...items, { type: 'divider' }],
          }}
          trigger={['click']}
          onOpenChange={setOpen}
          dropdownRender={(menu) => (
            <div style={contentStyle}>
              {React.cloneElement(menu as React.ReactElement, {
                style: menuStyle,
              })}
              <div>
                <Audited />
              </div>
            </div>
          )}
        >
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
      <div className="flex-center gap-[30px] max-md:gap-[20px]">
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

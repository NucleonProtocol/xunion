import SwapTVL from './SwapTVL';
import SwapVolume from '@/pages/x-dex/explore/SwapVolume.tsx';
import { cn } from '@/utils/classnames.ts';
import { useState } from 'react';
import PoolList from '@/pages/x-dex/explore/PoolList.tsx';
import TokenList from '@/pages/x-dex/explore/TokenList.tsx';
import { useTranslate } from '@/i18n';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import useExplore from '../hooks/useExplore';

function Explore() {
  const { t } = useTranslate();
  const { tvls, vols, getTvls, getVols } = useExplore();
  const tabs = [
    {
      label: t('x-dex.swap.token'),
      value: '0',
    },
    {
      label: t('x-dex.swap.pool'),
      value: '1',
    },
  ];
  const [poolType, onPoolChange] = useState('0');
  return (
    <div className="mt-[30px] flex  min-h-[420px]  flex-col items-center p-[20px] max-md:mt-0 max-md:p-[16px] max-md:pb-[80px]">
      <div className="max-md:mx-0 max-md:w-[calc(100%)] md:min-w-[1200px]">
        <div className="flex w-full gap-[20px] max-md:flex-col">
          <SwapTVL data={tvls?.items || []} getData={getTvls} />
          <SwapVolume data={vols?.items || []} getData={getVols} />
        </div>
        <div className="mt-[40px] flex flex-col gap-[20px]">
          <div className="flex w-full  justify-between gap-[20px]">
            <div className="flex items-center gap-[20px]">
              {(tabs || []).map((tab) => (
                <div
                  key={tab.value}
                  onClick={() => {
                    onPoolChange(tab.value);
                  }}
                  className={cn(
                    'flex-center h-[40px] gap-[12px] rounded-[20px] px-[16px] ',
                    poolType === tab.value
                      ? 'pointer-events-none bg-theme-non-opaque text-theme'
                      : 'cursor-pointer hover:bg-theme-non-opaque hover:text-theme '
                  )}
                >
                  <span className="max-md:text-[14px]">{tab.label}</span>
                </div>
              ))}
            </div>
            <div className="">
              {poolType === '0' && (
                <Link to={'/x-dex/listing'}>
                  <Button type="primary">Listing</Button>
                </Link>
              )}
            </div>
          </div>
          <div>{poolType === '0' ? <TokenList /> : <PoolList />}</div>
        </div>
      </div>
    </div>
  );
}

export default Explore;

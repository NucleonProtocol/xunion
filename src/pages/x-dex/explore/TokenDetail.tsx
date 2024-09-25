import SwapTVL from './SwapTVL';
import useExplore from '../hooks/useExplore';
import Swap from '../swap/Swap';
import { cn } from '@/utils/classnames';
import { useTranslate } from '@/i18n';
import TradeLIst from './TradeLIst';
import LiquidityList from './LiquidityList';
import { useState } from 'react';

function TokenDetail() {
  const { tvls, getTvls } = useExplore();
  const { t } = useTranslate();
  const [listType, setListType] = useState<'trade' | 'liquidity'>('trade');
  return (
    <div className="mt-[30px] flex  min-h-[420px]  flex-col items-center p-[20px] max-md:mt-0 max-md:p-[16px] max-md:pb-[80px]">
      <div className="max-md:mx-0 max-md:w-[calc(100%)] md:min-w-[1200px]">
        <div className="flex w-full gap-[20px] max-md:flex-col">
          <div className="flex-1">
            <SwapTVL data={tvls?.items || []} getData={getTvls} />
          </div>
          <Swap />
        </div>
        <div className="mt-[40px] flex flex-col gap-[20px]">
          <div className="flex items-center gap-[20px]">
            <div
              className={cn(
                'flex-center h-[40px] gap-[12px] rounded-[20px] px-[16px]',
                listType === 'trade'
                  ? 'pointer-events-none  bg-theme-non-opaque text-theme'
                  : 'cursor-pointer hover:bg-theme-non-opaque hover:text-theme'
              )}
              onClick={() => {
                setListType('trade');
              }}
            >
              <span className="max-md:text-[14px]">
                {t('x-dex.swap.trade')}
              </span>
            </div>
            <div
              onClick={() => {
                setListType('liquidity');
              }}
              className={cn(
                'flex-center h-[40px]  gap-[12px] rounded-[20px] px-[16px]  ',
                listType === 'liquidity'
                  ? 'pointer-events-none  bg-theme-non-opaque text-theme'
                  : 'cursor-pointer hover:bg-theme-non-opaque hover:text-theme'
              )}
            >
              <span className="max-md:text-[14px]">
                {t('x-dex.liquidity.title')}
              </span>
            </div>
          </div>
          <div>
            {listType === 'trade' && <TradeLIst />}
            {listType === 'liquidity' && <LiquidityList />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenDetail;

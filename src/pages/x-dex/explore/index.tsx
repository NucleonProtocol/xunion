import SwapTVL from './SwapTVL';
import SwapVolume from '@/pages/x-dex/explore/SwapVolume.tsx';
import { cn } from '@/utils/classnames.ts';
import { useState } from 'react';
import PoolList from '@/pages/x-dex/explore/PoolList.tsx';
import TokenList from '@/pages/x-dex/explore/TokenList.tsx';

const tabs = [
  {
    label: 'Token',
    value: '0',
  },
  {
    label: 'Pool',
    value: '1',
  },
];

function Explore() {
  const [poolType, onPoolChange] = useState('0');
  return (
    <div className="mt-[30px] flex  min-h-[420px]  flex-col items-center p-[20px] ">
      <div className="max-md:mx-[20px] max-md:w-[calc(100%-40px)] md:min-w-[1200px]">
        <div className="flex w-full gap-[20px]">
          <SwapTVL />
          <SwapVolume />
        </div>
        <div className="mt-[40px] flex flex-col gap-[20px]">
          <div className="flex justify-start gap-[20px]">
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
                <span>{tab.label}</span>
              </div>
            ))}
          </div>
          <div>{poolType === '0' ? <TokenList /> : <PoolList />}</div>
        </div>
      </div>
    </div>
  );
}

export default Explore;

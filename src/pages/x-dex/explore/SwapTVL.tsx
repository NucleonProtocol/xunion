import MagicCard from '@/components/MagicCard.tsx';
import TimePicker from '@/components/TimePicker.tsx';
import { times } from '@/pages/x-dex/explore/times.ts';
import TVLLinear from '@/pages/x-dex/explore/charts/TVLLinear.tsx';

const SwapTVL = () => {
  return (
    <MagicCard>
      <div className="flex flex-col py-[16px]">
        <div className="flex-center-between">
          <span className="text-[16px] text-tc-secondary">TVL</span>
          <TimePicker options={times} onTimeChange={() => {}} time="1D" />
        </div>
        <div className="mt-[10px] flex flex-col">
          <span className="text-[28px] font-[500]">$30.29 M</span>
          <div>
            <TVLLinear />
          </div>
        </div>
      </div>
    </MagicCard>
  );
};

export default SwapTVL;

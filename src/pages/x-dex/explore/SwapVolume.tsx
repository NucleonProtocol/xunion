import MagicCard from '@/components/MagicCard.tsx';
import TimePicker from '@/components/TimePicker.tsx';
import { times } from '@/pages/x-dex/explore/times.ts';
import VolumeBar from '@/pages/x-dex/explore/charts/VolumeBar.tsx';
import { useTranslate } from '@/i18n';

const SwapVolume = () => {
  const { t } = useTranslate();
  return (
    <MagicCard>
      <div className="flex flex-col py-[16px]">
        <div className="flex-center-between">
          <span className="text-[16px] text-tc-secondary">
            {t('common.volume')}
          </span>
          <TimePicker options={times} onTimeChange={() => {}} time="1D" />
        </div>
        <div className="mt-[10px] flex flex-col">
          <span className="text-[28px] font-[500]">$1.29 K</span>
          <div>
            <VolumeBar />
          </div>
        </div>
      </div>
    </MagicCard>
  );
};

export default SwapVolume;

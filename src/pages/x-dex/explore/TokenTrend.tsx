import MagicCard from '@/components/MagicCard';
import { useTranslate } from '@/i18n';
import { Recently } from '@/types/explore';
import { formatLargeNumber } from '@/utils';
import { Select } from 'antd';
import { formatUnits } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { times } from './times';
import { getTokenTVL, getTokenVOL } from '@/services/explore';
import { useMutation } from '@tanstack/react-query';
import VolumeBar from './charts/VolumeBar';
import TVLLinear from './charts/TVLLinear';

const TypeSelector = ({
  onChange,
  value,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const { t } = useTranslate();
  const options = [
    {
      value: 'price',
      label: t('common.price'),
    },
    {
      value: 'tvl',
      label: t('common.tvl'),
    },
    {
      value: 'vol',
      label: t('common.volume'),
    },
  ];
  return (
    <Select
      className="w-[100px]"
      options={options}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

const DateSelector = ({
  value,
  onChange,
}: {
  value: Recently;
  onChange: (v: Recently) => void;
}) => {
  return (
    <Select
      className="w-[60px]"
      options={times}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

const VOL = ({
  onTypeChange,
  address,
}: {
  onTypeChange: (type: string) => void;
  address: string;
}) => {
  const { t } = useTranslate();
  const [recently, setRecently] = useState<Recently>(Recently.day);

  const { data: vols, mutate: getVols } = useMutation({
    mutationFn: getTokenVOL,
  });

  useEffect(() => {
    if (recently) {
      getVols({ recently, token: address });
    }
  }, [recently]);

  const total = useMemo(() => {
    const sum = (vols?.items || []).reduce(
      (prev, next) => prev + Number(formatUnits(next?.amount || 0n)),
      0
    );
    return formatLargeNumber(sum, 4);
  }, [vols]);

  return (
    <MagicCard>
      <div className="flex flex-col py-[16px]">
        <div className="flex-center-between">
          <span className="text-[16px] text-tc-secondary">
            {t('common.volume')}
          </span>
          <div className="flex gap-[5px]">
            <TypeSelector value="vol" onChange={onTypeChange} />
            <DateSelector
              value={recently}
              onChange={(e) => {
                setRecently(e);
              }}
            />
          </div>
        </div>
        <div className="mt-[10px] flex flex-col">
          <span className="text-[28px] font-[500]">${total}</span>
          <VolumeBar recently={recently} data={vols?.items || []} />
        </div>
      </div>
    </MagicCard>
  );
};

const TVL = ({
  onTypeChange,
  address,
}: {
  onTypeChange: (type: string) => void;
  address: string;
}) => {
  const { t } = useTranslate();
  const [recently, setRecently] = useState<Recently>(Recently.day);

  const { data: tvls, mutate: getTVL } = useMutation({
    mutationFn: getTokenTVL,
  });

  useEffect(() => {
    if (recently) {
      getTVL({ recently, token: address });
    }
  }, [recently]);

  const total = useMemo(() => {
    const sum = (tvls?.items || []).reduce(
      (prev, next) => prev + Number(formatUnits(next?.amount || 0n)),
      0
    );
    return formatLargeNumber(sum, 4);
  }, [tvls]);

  return (
    <MagicCard>
      <div className="flex flex-col py-[16px]">
        <div className="flex-center-between">
          <span className="text-[16px] text-tc-secondary">
            {t('common.tvl')}
          </span>
          <div className="flex gap-[5px]">
            <TypeSelector value="tvl" onChange={onTypeChange} />
            <DateSelector
              value={recently}
              onChange={(e) => {
                setRecently(e);
              }}
            />
          </div>
        </div>
        <div className="mt-[10px] flex flex-col">
          <span className="text-[28px] font-[500]">${total}</span>
          <TVLLinear data={tvls?.items || []} recently={recently} />
        </div>
      </div>
    </MagicCard>
  );
};
const Price = ({
  onTypeChange,
  address,
}: {
  onTypeChange: (type: string) => void;
  address: string;
}) => {
  const { t } = useTranslate();
  const [recently, setRecently] = useState<Recently>(Recently.day);

  const { data: vols, mutate: getVols } = useMutation({
    mutationFn: getTokenVOL,
  });

  useEffect(() => {
    if (recently) {
      getVols({ recently, token: address });
    }
  }, [recently]);

  const total = useMemo(() => {
    const sum = (vols?.items || []).reduce(
      (prev, next) => prev + Number(formatUnits(next?.amount || 0n)),
      0
    );
    return formatLargeNumber(sum, 4);
  }, [vols]);

  return (
    <MagicCard>
      <div className="flex flex-col py-[16px]">
        <div className="flex-center-between">
          <span className="text-[16px] text-tc-secondary">
            {t('common.price')}
          </span>
          <div className="flex gap-[5px]">
            <TypeSelector value="price" onChange={onTypeChange} />
            <DateSelector
              value={recently}
              onChange={(e) => {
                setRecently(e);
              }}
            />
          </div>
        </div>
        <div className="mt-[10px] flex flex-col">
          <span className="text-[28px] font-[500]">${total}</span>
          <div>{/* <TVLLinear data={data} recently={recently} /> */}</div>
        </div>
      </div>
    </MagicCard>
  );
};

const TokenTrade = ({ address }: { address: string }) => {
  const [trendType, setTrendType] = useState<'price' | 'tvl' | 'vol' | string>(
    'tvl'
  );

  if (trendType === 'price') {
    return <Price onTypeChange={setTrendType} address={address} />;
  }

  if (trendType === 'tvl') {
    return <TVL onTypeChange={setTrendType} address={address} />;
  }

  return <VOL onTypeChange={setTrendType} address={address} />;
};

export default TokenTrade;

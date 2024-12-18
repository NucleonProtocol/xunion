import { formatCurrency } from '@/utils';
import MintSLC from './mint';
import BurnSLC from './burn';
import useSLCInfo from './hooks/useSLCInfo';
import { Skeleton } from 'antd';
import { cn } from '@/utils/classnames';
import TokenWithIcon from '@/components/TokenWithIcon';
import { SLCToken, USDCToken, USDTToken } from '@/contracts';
import { useTranslate } from '@/i18n';
const InfoWrapper = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'flex h-[180px] w-[364px] flex-col justify-center gap-[5px] rounded-[16px]  bg-fill-niubi p-[24px] max-md:h-[180px] max-md:w-full max-md:p-[16px]'
      )}
    >
      {loading ? <Skeleton active title={false} /> : children}
    </div>
  );
};

const XLibraUSD = () => {
  const { t } = useTranslate();
  const {
    isLoading,
    totalAmount,
    tvl,
    usdtAmount,
    usdcAmount,
    userAmount,
    slcPriceValue,
    totalAmountV1,
    amountxUSD,
  } = useSLCInfo();

  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[40px] max-md:pt-[40px] ">
      <div className="mt-[30px] min-h-[420px]  w-full p-[20px] pb-[100px] max-md:mx-0 max-md:p-[16px] max-md:pb-[80px] md:max-w-[1200px]">
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-[10px]">
          <InfoWrapper loading={isLoading}>
            <div className="flex flex-col">
              <span className="text-tc-secondary">
                {t('x-usd.collateral.tvl')}
              </span>
              <span className="text-[24px] font-[500]">
                {formatCurrency(tvl, true, 0)}
              </span>
            </div>
            <div className="mt-[10px] flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-[500]">
                  {formatCurrency(usdtAmount, false, 0)}
                </span>
                <span>
                  <TokenWithIcon token={USDTToken} />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-[500]">
                  {formatCurrency(usdcAmount, false, 0)}
                </span>
                <span>
                  <TokenWithIcon token={USDCToken} />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-[500]">
                  {formatCurrency(amountxUSD, false, 0)}
                </span>
                <span>
                  <TokenWithIcon token={SLCToken} />
                </span>
              </div>
            </div>
          </InfoWrapper>
          <InfoWrapper loading={isLoading}>
            <div className="flex flex-col">
              <span className="text-tc-secondary">
                {t('x-usd.total.minted')}
              </span>
              <span className="text-[24px] font-[500]">
                {formatCurrency(totalAmount, false, 0)}
              </span>
              <span className="text-[14px] text-tc-secondary">
                ( {t('x-usd.total.minted.v1')}{' '}
                {formatCurrency(totalAmountV1, false, 0)})
              </span>
            </div>
            <div className="mt-[10px] flex flex-col gap-[5px]">
              <span className="text-tc-secondary">
                {t('x-usd.current.value')}
              </span>
              <span className="text-[16px] font-[500]">
                {formatCurrency(slcPriceValue, true, 6)}
              </span>
            </div>
          </InfoWrapper>
          <InfoWrapper loading={isLoading}>
            <div className="flex flex-col">
              <span className="text-tc-secondary">
                {t('x-usd.your.minted')}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-[500]">
                  {formatCurrency(userAmount, false, 0)}
                </span>
                <span>
                  <TokenWithIcon token={SLCToken} />
                </span>
              </div>
              <span className="text-[14px] text-tc-secondary">
                {formatCurrency(userAmount * slcPriceValue, true, 4)}
              </span>
            </div>
            <div className="mt-[10px] text-[14px] text-tc-secondary">
              {t('x-usd.you.can.only.burn.the.amount.you.have.minted')}
            </div>
          </InfoWrapper>
        </div>
        <div className="mt-[30px] flex flex-wrap gap-[20px]">
          <MintSLC />
          <BurnSLC />
        </div>
      </div>
    </div>
  );
};

export default XLibraUSD;

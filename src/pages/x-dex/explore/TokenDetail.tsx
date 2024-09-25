import Swap from '../swap/Swap';
import { cn } from '@/utils/classnames';
import { useTranslate } from '@/i18n';
import TradeLIst from './TradeLIst';
import LiquidityList from './LiquidityList';
import useExploreToken from '../hooks/useExploreToken';
import { Spin } from 'antd';
import TokenTrade from './TokenTrend';

function TokenDetail() {
  const { t } = useTranslate();
  const {
    loading,
    navigate,
    listType,
    setListType,
    receiveToken,
    tokenAddress,
  } = useExploreToken();
  return (
    <div className="mt-[30px] flex  min-h-[420px]  flex-col items-center p-[20px] max-md:mt-0 max-md:p-[16px] max-md:pb-[80px]">
      <div className="max-md:mx-0 max-md:w-[calc(100%)] md:min-w-[1200px]">
        <div className="flex w-full gap-[20px] max-md:flex-col">
          <div className="flex-1">
            <TokenTrade address={tokenAddress! || ''} />
          </div>
          <Spin spinning={!!loading}>
            <Swap
              receiveToken={receiveToken}
              onReceiveChange={(token) => {
                if (token) {
                  navigate(`/x-dex/explore/token/${token.address}`);
                }
              }}
            />
          </Spin>
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

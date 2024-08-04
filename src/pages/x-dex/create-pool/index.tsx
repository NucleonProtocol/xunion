import { Link } from 'react-router-dom';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import TokenInput from '@/components/TokenInput.tsx';
import useCreatePool from '@/pages/x-dex/hooks/useCreatePool.ts';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import { isSLCToken } from '@/contracts';
import Warning from '@/components/Warning.tsx';
import UploadInfo from '@/pages/x-dex/create-pool/UploadInfo.tsx';
import { useTranslate } from '@/i18n';

function CreatPool() {
  const {
    tokenA,
    onTokenAChange,
    tokenAOwnerAmount,
    tokenB,
    onTokenBChange,
    tokenBOwnerAmount,
    tokenASLCPairAddress,
    tokenBSLCPairAddress,
    lpPairAddress,
    onCreate,
    loading,
  } = useCreatePool();

  const { t } = useTranslate();
  const renderAction = () => {
    if (tokenA?.address && tokenB?.address) {
      if (!tokenASLCPairAddress && !isSLCToken(tokenB?.address)) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>{t('x-dex.liquidity.no.pair.address.tip')}</Warning>
            <WithAuthButton>
              <Button
                className="w-full"
                type="primary"
                size="large"
                onClick={() => {
                  onTokenAChange(tokenA);
                }}
              >
                {t('x-dex.pools.initialize.pool', {
                  name: `${tokenA?.symbol}`,
                })}
              </Button>
            </WithAuthButton>
          </div>
        );
      }
      if (!tokenBSLCPairAddress) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>{t('x-dex.liquidity.no.pair.address.tip')}</Warning>
            <WithAuthButton>
              <Button
                className="w-full"
                type="primary"
                size="large"
                onClick={() => {
                  onTokenAChange(tokenB);
                }}
              >
                {t('x-dex.pools.initialize.pool', {
                  name: `${tokenB?.symbol}`,
                })}
              </Button>
            </WithAuthButton>
          </div>
        );
      }
      if (lpPairAddress) {
        return (
          <Link to="/x-dex/liquidity">
            <WithAuthButton>
              <Button className="mt-[20px] w-full" type="primary" size="large">
                {t('x-dex.liquidity.add')}
              </Button>
            </WithAuthButton>
          </Link>
        );
      }
    }

    return (
      <div className="mt-[20px] flex flex-col gap-[10px]">
        <Warning>{t('x-dex.pools.create.tip')}</Warning>
        <WithAuthButton>
          <Button
            className="w-full"
            type="primary"
            size="large"
            disabled={!tokenA?.address || !tokenB?.address}
            loading={loading}
            onClick={onCreate}
          >
            {t('x-dex.pools.create')}
          </Button>
        </WithAuthButton>
      </div>
    );
  };

  return (
    <div className="mb-[60px] flex flex-1 flex-col items-center justify-center pt-[20px] max-md:pt-[20px]">
      <div className="mt-[30px] min-h-[420px] w-[500px]  rounded-[20px] bg-fill-niubi p-[20px] max-md:mx-[20px] max-md:w-[calc(100%-40px)]">
        <Link
          to="/x-dex/liquidity"
          className="inline-block w-auto cursor-pointer  hover:text-theme"
        >
          <LeftOutlined />
          <span className="pl-[10px]">{t('x-dex.liquidity.add')}</span>
        </Link>
        <div className="mt-[20px]">
          <TokenInput
            title={t('x-dex.liquidity.input.tokenA')}
            token={tokenA}
            onTokenChange={onTokenAChange}
            placeholder=" "
            amount={undefined}
            disabledToken={tokenB}
            onAmountChange={() => {}}
            ownerAmount={tokenAOwnerAmount}
            totalPrice={0}
          />
          <div className="relative h-[20px]">
            <div className="flex-center  absolute left-[50%]  top-[-8px] h-[36px] w-[36px] -translate-x-[50%] transform rounded-[2px] border-[3px] border-line-primary2 bg-background-primary">
              <PlusOutlined />
            </div>
          </div>
          <TokenInput
            title={t('x-dex.liquidity.input.tokenB')}
            token={tokenB}
            placeholder=" "
            disabledToken={tokenA}
            onTokenChange={onTokenBChange}
            amount={undefined}
            onAmountChange={() => {}}
            ownerAmount={tokenBOwnerAmount}
            totalPrice={0}
          />
        </div>
        <div>{renderAction()}</div>
        {isSLCToken(tokenB?.address || '') && !lpPairAddress && (
          <UploadInfo lpPairAddress={lpPairAddress} />
        )}
      </div>
    </div>
  );
}

export default CreatPool;

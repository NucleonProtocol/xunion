import { Link } from 'react-router-dom';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import TokenInput from '@/components/TokenInput.tsx';
import useCreatePool from '@/pages/x-dex/hooks/useCreatePool.ts';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import { isSLCToken } from '@/contracts';
import Warning from '@/components/Warning.tsx';
import { useTranslate } from '@/i18n';

function CreatePool() {
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
    tokenAAmount,
    onTokenAAmountChange,
    onTokenBAmountChange,
    tokenBAmount,
    invalidWallet,
    disabled,
  } = useCreatePool();

  const { t } = useTranslate();
  const renderAction = () => {
    if (tokenA?.address && tokenB?.address) {
      if (!tokenASLCPairAddress && !isSLCToken(tokenB?.address)) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>{t('x-dex.liquidity.no.pair.address.tip')}</Warning>
            <Link to={`/x-dex/listing?tokenA=${tokenA?.address}`}>
              <WithAuthButton>
                <Button className="w-full" type="primary" size="large">
                  {t('x-dex.pools.initialize.pool', {
                    name: `${tokenA?.symbol}`,
                  })}
                </Button>
              </WithAuthButton>
            </Link>
          </div>
        );
      }
      if (!tokenBSLCPairAddress) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>{t('x-dex.liquidity.no.pair.address.tip')}</Warning>
            <Link to={`/x-dex/listing?tokenA=${tokenB?.address}`}>
              <WithAuthButton>
                <Button className="w-full" type="primary" size="large">
                  {t('x-dex.pools.initialize.pool', {
                    name: `${tokenB?.symbol}`,
                  })}
                </Button>
              </WithAuthButton>
            </Link>
          </div>
        );
      }
      if (lpPairAddress) {
        return (
          <Link
            to={`/x-dex/liquidity?tokenA=${tokenA?.address}&tokenB=${tokenB?.address}`}
          >
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
            disabled={disabled}
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
          <span className="pl-[10px]">{t('x-dex.pools.create')}</span>
        </Link>
        <div className="mt-[20px]">
          <TokenInput
            title={t('x-dex.liquidity.input.tokenA')}
            editable
            token={tokenA}
            onTokenChange={onTokenAChange}
            amount={tokenAAmount}
            onAmountChange={onTokenAAmountChange}
            disabledToken={tokenB}
            disabled={invalidWallet}
            onMax={(ownerAmount) => {
              onTokenAAmountChange(ownerAmount.toString());
            }}
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
            editable
            token={tokenB}
            onTokenChange={onTokenBChange}
            amount={tokenBAmount}
            onAmountChange={onTokenBAmountChange}
            disabledToken={tokenA}
            disabled={invalidWallet}
            onMax={(ownerAmount) => {
              onTokenBAmountChange(ownerAmount.toString());
            }}
            ownerAmount={tokenBOwnerAmount}
            totalPrice={0}
          />
        </div>
        <div>{renderAction()}</div>
      </div>
    </div>
  );
}

export default CreatePool;

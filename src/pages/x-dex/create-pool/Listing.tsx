import { Link } from 'react-router-dom';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import TokenInput from '@/components/TokenInput.tsx';
import useListing from '@/pages/x-dex/hooks/useListing';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import { isSLCToken } from '@/contracts';
import UploadInfo from '@/pages/x-dex/create-pool/UploadInfo.tsx';
import { useTranslate } from '@/i18n';
import SLCTokenInput from '@/components/SLCTokenInput';
import Info from '@/components/Info';

function CreatPool() {
  const {
    tokenA,
    onTokenAChange,
    tokenAOwnerAmount,
    tokenB,
    tokenBAmount,
    setTokenBAmount,
    tokenBOwnerAmount,
    lpPairAddress,
    onCreate,
    loading,
    tokenAAmount,
    onTokenAAmountChange,
    disabled,
    invalidWallet,
  } = useListing();

  const { t } = useTranslate();

  return (
    <div className="mb-[60px] flex flex-1 flex-col items-center justify-center pt-[20px] max-md:pt-[20px]">
      <div className="mt-[30px] min-h-[420px] w-[500px]  rounded-[20px] bg-fill-niubi p-[20px] max-md:mx-[20px] max-md:w-[calc(100%-40px)]">
        <Link
          to="/x-dex/liquidity"
          className="inline-block w-auto cursor-pointer  hover:text-theme"
        >
          <LeftOutlined />
          <span className="pl-[10px]">{t('x-dex.liquidity.listing')}</span>
        </Link>

        <div className="my-[10px]">
          <Info>{t('x-dex.liquidity.no.pair.address.tip')}</Info>
        </div>
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
          <SLCTokenInput
            editable
            title={t('x-dex.liquidity.input.tokenB')}
            token={tokenB}
            placeholder="1000"
            amount={tokenBAmount}
            onAmountChange={setTokenBAmount}
            ownerAmount={tokenBOwnerAmount}
          />
        </div>
        <WithAuthButton>
          <Button
            className="w-full"
            type="primary"
            size="large"
            onClick={onCreate}
            loading={loading}
            disabled={disabled || !!lpPairAddress}
          >
            {lpPairAddress
              ? `${tokenA?.symbol} already listed`
              : t('x-dex.liquidity.listing')}
          </Button>
        </WithAuthButton>
        {isSLCToken(tokenB?.address || '') && !lpPairAddress && (
          <UploadInfo lpPairAddress={lpPairAddress} />
        )}
      </div>
    </div>
  );
}

export default CreatPool;

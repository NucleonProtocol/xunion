import { LeftOutlined } from '@ant-design/icons';
import { ConfirmContent } from '@/pages/x-dex/swap/SwapInfo.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import { SwapReturnType } from '@/pages/x-dex/hooks/useSwap.ts';
import { Token } from '@/types/swap.ts';
import useApprove from '@/pages/x-dex/hooks/useApprove.ts';
import { XUNION_SWAP_CONTRACT } from '@/contracts';
import { Address } from 'viem';
import useSwapConfirm from '@/pages/x-dex/hooks/useSwapConfirm.ts';
import { TokenIcon } from '@/components/icons';
import { WriteContractMutateAsync } from '@wagmi/core/query';
import { useTranslate } from '@/i18n';

const TokenItem = ({
  token,
  amount,
  title,
}: {
  token?: Token;
  amount?: string;
  title?: string;
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-[14px] text-tc-secondary">{title}</p>
      <div className="flex items-center py-[10px]">
        <span className="flex-1 text-[26px] font-bold">{amount}</span>
        <div className="flex-center gap-[5px]">
          <span className="flex-center text-[20px]">
            <TokenIcon src={token?.icon} width={20} height={20} />
          </span>
          <span>{token?.symbol}</span>
        </div>
      </div>
    </div>
  );
};

const ConfirmPanel = ({
  slippage,
  inputToken,
  outputToken,
  payAmount,
  receiveAmount,
  priceImpact,
  fee,
  estReceived,
  minReceived,
  feeAmount,
  isInsufficient,
  isReady,
  onFillSwap,
  deadline,
  router,
  isSubmittedLoading,
  writeContractAsync,
}: SwapReturnType & {
  isSubmittedLoading?: boolean;
  writeContractAsync: WriteContractMutateAsync<any>;
}) => {
  const { isApproved, loading, approve } = useApprove({
    token: inputToken!,
    amount: payAmount,
    spenderAddress: XUNION_SWAP_CONTRACT.interface.address as Address,
  });
  const { confirm } = useSwapConfirm({
    inputToken,
    outputToken,
    payAmount,
    receiveAmount,
    slippage,
    deadline,
    router,
    writeContractAsync,
  });

  const { t } = useTranslate();
  return (
    <div className="mt-[30px] min-h-[420px] w-[500px]  rounded-[20px] bg-fill-niubi p-[20px] max-md:mx-[20px] max-md:w-[calc(100%-40px)]">
      <a
        className="inline-block w-auto cursor-pointer  hover:text-theme"
        onClick={onFillSwap}
      >
        <LeftOutlined />
        <span className="pl-[10px]">{t('x-dex.swap.confirm')}</span>
      </a>
      <div className="mt-[20px]">
        <TokenItem
          token={inputToken}
          amount={payAmount}
          title={t('x-dex.swap.input.pay')}
        />
        <TokenItem
          token={outputToken}
          amount={receiveAmount}
          title={t('x-dex.swap.input.receive')}
        />
      </div>
      <div className="px-[10px] py-[20px] text-[14px]">
        <ConfirmContent
          slippage={slippage}
          priceImpact={priceImpact}
          fee={fee}
          feeAmount={feeAmount}
          estReceived={estReceived}
          minReceived={minReceived}
          inputToken={inputToken}
          outputToken={outputToken}
          router={router}
        />
      </div>
      <div className="rounded-[8px] bg-status-warning-non-opaque p-[10px]">
        <span className="text-[14px]">
          {t('x-dex.swap.confirm.tip', {
            amount: `${receiveAmount} ${outputToken?.symbol}`,
          })}
        </span>
      </div>
      <div className="mt-[20px] w-full">
        <WithAuthButton
          disabled={!isReady || isInsufficient}
          onClick={() => {
            if (!isApproved) {
              approve();
            } else {
              confirm();
            }
          }}
        >
          <Button
            className="h-[56px]  w-full"
            type="primary"
            size="large"
            loading={loading || isSubmittedLoading}
          >
            {!isApproved
              ? t('x-dex.swap.give.permission', {
                  name: `${inputToken?.symbol}`,
                })
              : t('x-dex.swap.title')}
          </Button>
        </WithAuthButton>
      </div>
    </div>
  );
};

export default ConfirmPanel;

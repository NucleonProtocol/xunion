import TokenInput from '@/components/TokenInput.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button, Form } from 'antd';
import SecondTabs from '@/pages/x-dex/swap/SecondTabs.tsx';
import AddressInput from '@/components/AddressInput.tsx';
import { Address, isAddress } from 'viem';
import useSendToken from '@/pages/x-dex/hooks/useSendToken.ts';
import useApprove from '@/pages/x-dex/hooks/useApprove.ts';
import { XUNION_SWAP_CONTRACT } from '@/contracts';
import { useTranslate } from '@/i18n';

const SendingPanel = ({
  onSwapTypeChange,
}: {
  onSwapTypeChange: (value: string) => void;
}) => {
  const {
    inputToken,
    setInputToken,
    payAmount,
    setPayAmount,
    inputOwnerAmount,
    inputTokenTotalPrice,
    isInsufficient,
    cisAddress,
    form,
    getAddrByCISId,
    cis,
    confirm,
    isSubmittedLoading,
  } = useSendToken();
  const { t } = useTranslate();
  const { isApproved, loading, approve } = useApprove({
    token: inputToken!,
    amount: payAmount,
    spenderAddress: XUNION_SWAP_CONTRACT.interface.address as Address,
  });

  const renderSwapText = () => {
    if (isInsufficient) {
      return t('common.error.insufficient', { name: `${inputToken?.symbol}` });
    }
    if (!isApproved && inputToken?.symbol) {
      return t('common.approve.to', { name: `${inputToken?.symbol}` });
    }
    return t('x-dex.send.title');
  };
  return (
    <div className="min-h-[420px] w-[500px]  rounded-[20px] bg-fill-niubi p-[20px] max-md:w-full">
      <div className="flex items-center justify-between ">
        <SecondTabs active="send" onChange={onSwapTypeChange} />
      </div>
      <div className="mt-[20px]">
        <TokenInput
          title={t('x-dex.send.input.pay')}
          editable
          token={inputToken}
          onTokenChange={setInputToken}
          amount={payAmount}
          onAmountChange={setPayAmount}
          onMax={(ownerAmount) => {
            setPayAmount(ownerAmount.toString());
          }}
          ownerAmount={inputOwnerAmount}
          totalPrice={inputTokenTotalPrice}
        />
        <div className="h-[20px]" />
        <Form form={form}>
          <Form.Item
            rules={[
              {
                validator: async (_, value) => {
                  if (value) {
                    if (!isAddress(value)) {
                      const addr = await getAddrByCISId(value);
                      if (!addr) {
                        return Promise.reject(
                          t('common.error.no.record.address.')
                        );
                      }
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
            name="address"
          >
            <AddressInput
              title={t('x-dex.send.to')}
              placeholder={t('x-dex.send.to.placeholder')}
              cisAddress={cisAddress}
            />
          </Form.Item>
        </Form>
        {cisAddress && (
          <p className="mt-[-20px] text-[14px] text-tc-secondary">
            {cisAddress}
          </p>
        )}
      </div>

      <div className="mt-[30px] h-[56px]  w-full">
        <WithAuthButton>
          <Button
            className="w-full"
            type="primary"
            size="large"
            loading={loading || isSubmittedLoading}
            disabled={!(isAddress(cis) || !!cisAddress) || isInsufficient}
            onClick={() => {
              form.validateFields().then(() => {
                if (!isApproved) {
                  approve();
                } else {
                  confirm();
                }
              });
            }}
          >
            {renderSwapText()}
          </Button>
        </WithAuthButton>
      </div>
    </div>
  );
};

export default SendingPanel;

import TokenInput from '@/pages/trade/component/TokenInput.tsx';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button, Form } from 'antd';
import SecondTabs from '@/pages/trade/swap/SecondTabs.tsx';
import AddressInput from '@/pages/trade/component/AddressInput.tsx';
import { Address, isAddress } from 'viem';
import useSendToken from '@/pages/trade/hooks/useSendToken.ts';
import useApprove from '@/pages/trade/hooks/useApprove.ts';
import { XUNION_SWAP_CONTRACT } from '@/contracts';

const SendingPanel = () => {
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

  const { isApproved, loading, approve } = useApprove({
    token: inputToken!,
    amount: payAmount,
    spenderAddress: XUNION_SWAP_CONTRACT.interface.address as Address,
  });

  const renderSwapText = () => {
    if (isInsufficient) {
      return `Insufficient ${inputToken?.symbol} Balance`;
    }
    if (!isApproved && inputToken?.symbol) {
      return `Approve ${inputToken?.symbol}`;
    }
    return 'Send';
  };
  return (
    <div className="mt-[30px] min-h-[420px] w-[500px]  rounded-[20px] bg-fill-niubi p-[20px] max-md:mx-[20px] max-md:w-[calc(100%-40px)]">
      <div className="flex items-center justify-between ">
        <SecondTabs active="Send" />
      </div>
      <div className="mt-[20px]">
        <TokenInput
          title="You're sending"
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
                        return Promise.reject('No record address.');
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
              title="To address"
              placeholder="An address e.g. 0x... or a CIS name"
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

import { Link } from 'react-router-dom';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import TokenInput from '@/pages/trade/component/TokenInput.tsx';
import useCreatePool from '@/pages/trade/hooks/useCreatePool.ts';
import WithAuthButton from '@/components/Wallet/WithAuthButton.tsx';
import { Button } from 'antd';
import { isSLCToken } from '@/contracts';
import Warning from '@/pages/trade/component/Warning.tsx';
import UploadInfo from '@/pages/trade/create-pool/UploadInfo.tsx';

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

  const renderAction = () => {
    if (tokenA?.address && tokenB?.address) {
      if (!tokenASLCPairAddress && !isSLCToken(tokenB?.address)) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>
              Initial pool not found. You need to first set up an initial pool
              using the SLC. Swap SLC Initial pool not found. You need to first
              set up an initial pool using the SLC.
            </Warning>
            <WithAuthButton>
              <Button
                className="w-full"
                type="primary"
                size="large"
                onClick={() => {
                  onTokenAChange(tokenA);
                }}
              >
                {`Initialize ${tokenA?.symbol} pool`}
              </Button>
            </WithAuthButton>
          </div>
        );
      }
      if (!tokenBSLCPairAddress) {
        return (
          <div className="flex flex-col gap-[10px]">
            <Warning>
              Initial pool not found. You need to first set up an initial pool
              using the SLC. Swap SLC Initial pool not found. You need to first
              set up an initial pool using the SLC.
            </Warning>
            <WithAuthButton>
              <Button
                className="w-full"
                type="primary"
                size="large"
                onClick={() => {
                  onTokenAChange(tokenB);
                }}
              >
                {`Initialize ${tokenB?.symbol} pool`}
              </Button>
            </WithAuthButton>
          </div>
        );
      }
      if (lpPairAddress) {
        return (
          <Link to="/trade/liquidity">
            <WithAuthButton>
              <Button className="mt-[20px] w-full" type="primary" size="large">
                Add Liquidity
              </Button>
            </WithAuthButton>
          </Link>
        );
      }
    }

    return (
      <div className="mt-[20px] flex flex-col gap-[10px]">
        <Warning>
          Initial liquidity of the pool will be locked in the LP vault, it can
          be unlocked only if there is the only LP.
        </Warning>
        <WithAuthButton>
          <Button
            className="w-full"
            type="primary"
            size="large"
            disabled={!tokenA?.address || !tokenB?.address}
            loading={loading}
            onClick={onCreate}
          >
            Create pool
          </Button>
        </WithAuthButton>
      </div>
    );
  };

  return (
    <div className="mb-[60px] flex flex-1 flex-col items-center justify-center pt-[20px] max-md:pt-[20px]">
      <div className="mt-[30px] min-h-[420px] w-[500px]  rounded-[20px] bg-fill-niubi p-[20px] max-md:mx-[20px] max-md:w-[calc(100%-40px)]">
        <Link
          to="/trade/liquidity"
          className="inline-block w-auto cursor-pointer  hover:text-theme"
        >
          <LeftOutlined />
          <span className="pl-[10px]">Add Liquidity</span>
        </Link>
        <div className="mt-[20px]">
          <TokenInput
            title="Token A"
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
            title="Token B"
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

import { Divider, Input, Modal, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { cn } from '@/utils/classnames.ts';
import { Token } from '@/types/swap.ts';
import { recommends } from '@/pages/trade/swap/tokens.tsx';
import useErc20Balance from '@/hooks/useErc20Balance.ts';

const ModalContent = ({
  value,
  disabledToken,
  onChange,
  onOpen,
}: {
  value?: Token;
  onChange: (value: Token) => void;
  disabledToken?: Token;
  disabled?: boolean;
  onOpen: (v: boolean) => void;
}) => {
  const { getBalance } = useErc20Balance();
  const [loading, setLoading] = useState(false);

  const [recommendsWithAmount, setAmounts] = useState(recommends);

  const getAllBalance = async () => {
    setLoading(true);
    const calls = recommends.map((item) => getBalance(item.address));
    return Promise.all(calls)
      .then((amounts) => {
        setAmounts(
          recommends.map((item, index) => ({ ...item, amount: amounts[index] }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllBalance();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="h-[600px] overflow-y-auto">
        <div className="mb-[20px] text-[14px] text-tc-secondary">
          Select a token from our default list or search for a token by symbol
          or address.
        </div>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search name or paste address"
          className="rounded-[20px]"
        />
        <div className="my-[20px] flex flex-wrap gap-[20px]">
          {recommends.map((item) => (
            <div
              className={cn(
                'flex-center  h-[32px] cursor-pointer gap-[10px] rounded-[20px] border-2  border-solid px-[16px]',
                'hover:border-transparent hover:bg-fill-primary',
                {
                  'border-transparent bg-fill-primary':
                    item.symbol === value?.symbol,
                  'cursor-not-allowed opacity-75':
                    disabledToken?.symbol === item.symbol,
                }
              )}
              key={item.symbol}
              onClick={() => {
                if (disabledToken?.symbol !== item.symbol) {
                  onChange(item);
                  onOpen(false);
                }
              }}
            >
              {item.icon}
              {item.symbol}
            </div>
          ))}
        </div>
        <Divider />
        <div className="my-[20px] flex flex-col gap-[20px]">
          {recommendsWithAmount.map((item) => (
            <div
              className={cn(
                'flex-center cursor-pointer gap-[10px] rounded-[12px] px-[10px] hover:opacity-75',
                {
                  'cursor-not-allowed opacity-75':
                    disabledToken?.symbol === item.symbol,
                }
              )}
              key={item.symbol}
              onClick={() => {
                if (disabledToken?.symbol !== item.symbol) {
                  onChange(item);
                  onOpen(false);
                }
              }}
            >
              <div className="text-[36px]">{item.icon}</div>
              <div className="flex flex-1 flex-col">
                <span className="text-[16px]"> {item.name}</span>
                <span className="text-[14px] text-tc-secondary">
                  {item.symbol}
                </span>
              </div>
              <div className="">
                <span>{item.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  );
};

const TokenSelector = ({
  value,
  onChange,
  disabledToken,
  disabled,
}: {
  value?: Token;
  onChange: (value: Token) => void;
  disabledToken?: Token;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-center flex-shrink-0">
      <Modal
        open={open}
        maskClosable
        onCancel={() => {
          setOpen(false);
        }}
        width={500}
        title="Select a token"
        footer={null}
      >
        <ModalContent
          value={value}
          disabledToken={disabledToken}
          onChange={onChange}
          onOpen={setOpen}
        />
      </Modal>
      <div
        className={cn(
          'flex-center h-[40px] flex-shrink-0  gap-[10px] rounded-[20px] px-[10px]',
          {
            ' cursor-pointer hover:bg-theme-non-opaque': !disabled,
          }
        )}
        onClick={() => {
          if (!disabled) {
            setOpen(true);
          }
        }}
      >
        {value?.symbol ? (
          <>
            <span className="text-[22px]">{value.icon}</span>
            <span>{value?.symbol}</span>
          </>
        ) : (
          <span className="text-tc-secondary">Select Token</span>
        )}

        <DownOutlined className="text-[14px] text-tc-secondary" />
      </div>
    </div>
  );
};

export default TokenSelector;

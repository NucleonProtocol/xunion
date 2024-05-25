import { Divider, Input, Modal } from 'antd';
import { useState } from 'react';
import { ADAIcon, CFXIcon, ETHIcon } from '@/components/icons/tokens';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { cn } from '@/utils/classnames.ts';
import { Token } from '@/types/swap.ts';

const recommends: Token[] = [
  {
    symbol: 'ETH',
    name: 'ETH',
    icon: <ETHIcon />,
    address: '1',
    price: '200.00',
  },
  {
    symbol: 'ADA',
    name: 'ADA Coin',
    icon: <ADAIcon />,
    address: '2',
    price: '1.002',
  },
  {
    symbol: 'CFX',
    name: 'CFX Coin',
    icon: <CFXIcon />,
    address: '3',
    price: '0.402',
  },
];

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
        <div>
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
                    setOpen(false);
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
            {recommends.map((item) => (
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
                    setOpen(false);
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
                  <span>{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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

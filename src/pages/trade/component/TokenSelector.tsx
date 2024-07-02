import { Button, Divider, Input, Modal, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { cn } from '@/utils/classnames.ts';
import { Token } from '@/types/swap.ts';
import useErc20Balance from '@/hooks/useErc20Balance.ts';
import { SpinIcon } from '@/components/icons/tokens';
import { useMutation } from '@tanstack/react-query';
import { getTokenList } from '@/services/token.ts';
import { TokenIcon } from '@/components/icons';
import useAddToken from '@/hooks/useAddToken.ts';

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
  const [recommends, setRecommends] = useState<Token[]>();
  const { addToken } = useAddToken();

  const { isPending, mutate: getTokens } = useMutation({
    mutationFn: getTokenList,
    onSuccess: (res) => {
      if (res?.items) {
        setRecommends([
          {
            name: 'CFX',
            symbol: 'CFX',
            chainId: 71,
            address: '0x0000000000000000000000000000000000000000',
            decimals: 18,
          },
          ...res?.items,
        ]);
      }
    },
  });

  useEffect(() => {
    getTokens({ pageNum: 1, pageSize: 50 });
  }, []);

  useEffect(() => {
    if (recommends?.length) {
      setLoading(true);
      const calls = recommends.map((item) => getBalance(item.address));
      Promise.all(calls)
        .then((amounts) => {
          setRecommends(
            recommends.map((item, index) => ({
              ...item,
              amount: amounts[index],
            }))
          );
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [recommends?.length]);

  return (
    <div className="h-[600px] overflow-y-auto">
      <div className="mb-[20px] text-[14px] text-tc-secondary">
        Select a token from our default list or search for a token by symbol or
        address.
      </div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search name or paste address"
        className="rounded-[20px]"
        onBlur={(e) => {
          getTokenList({
            pageNum: 1,
            pageSize: 50,
            nameOrAddress: e.target.value,
          });
        }}
      />
      <Spin indicator={<SpinIcon />} spinning={isPending}>
        <div className="my-[20px] flex flex-wrap gap-[20px]">
          {(recommends || []).slice(0, 6).map((item) => (
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
              <TokenIcon src={item.icon} />
              {item.symbol}
            </div>
          ))}
        </div>
        <Divider />
        <div className="my-[10px] flex flex-col gap-[5px] ">
          {(recommends || []).map((item) => (
            <div
              className={cn(
                'flex-center cursor-pointer gap-[10px] rounded-[12px] px-[10px] hover:bg-theme-non-opaque hover:opacity-75',
                {
                  'cursor-not-allowed  bg-fill-niubi opacity-75':
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
              <div className="text-[36px]">
                <TokenIcon src={item.icon} />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-[16px]"> {item.name}</span>
                <span className="text-[14px] text-tc-secondary">
                  {item.symbol}
                </span>
              </div>
              <div
                className="flex items-center gap-[20px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span>
                  {loading ? <SpinIcon /> : <span>{item.amount}</span>}
                </span>
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    addToken(item);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Spin>
    </div>
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
          'flex-center h-[40px] flex-shrink-0  gap-[5px] rounded-[20px] text-tc-secondary',
          {
            'cursor-pointer hover:text-theme': !disabled,
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
            <span className="text-[22px]">
              <TokenIcon src={value.icon} />
            </span>
            <span>{value?.symbol}</span>
          </>
        ) : (
          <span className="">Select Token</span>
        )}

        <DownOutlined className="text-[14px]" />
      </div>
    </div>
  );
};

export default TokenSelector;

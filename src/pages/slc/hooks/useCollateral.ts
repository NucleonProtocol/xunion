import { useEffect } from 'react';
import useMulticall, { ContractCall } from '@/hooks/useMulticall.ts';
import { useAccount } from 'wagmi';
import { erc20Abi } from 'viem';
import { useMutation } from '@tanstack/react-query';
import { getTokenList } from '@/services/slc.ts';

const useCollateral = () => {
  const { multiCall } = useMulticall();
  const { address } = useAccount();

  const {
    mutate,
    data,
    isPending: loading,
  } = useMutation({ mutationFn: getTokenList });

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (data?.items?.length && address) {
      const calls: ContractCall[] = data?.items.map((item) => ({
        name: 'balanceOf',
        abi: erc20Abi,
        address: item.address,
        values: [address],
      }));
      multiCall(calls).then((res) => {
        console.log('res', res);
      });
    }
  }, [data, address]);
  return {
    assets: data?.items || [],
    loading,
  };
};

export default useCollateral;

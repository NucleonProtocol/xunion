import { Token } from '@/types/swap.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useInterfaceContract from '@/hooks/useInterfaceContract.ts';
import { isSLCToken, XUNION_SWAP_CONTRACT } from '@/contracts';

const usePair = ({
  fromToken,
  toToken,
}: {
  fromToken?: Token;
  toToken?: Token;
}) => {
  const [pairAddress, setPairAddress] = useState('');
  const contract = useInterfaceContract();

  const toAddress = useMemo(() => {
    return isSLCToken(fromToken?.address || '') &&
      isSLCToken(toToken?.address || '')
      ? XUNION_SWAP_CONTRACT.usdt.address
      : toToken?.address;
  }, [fromToken?.address, toToken?.address]);

  const getPairAddress = useCallback(async () => {
    if (fromToken?.address && toToken?.address) {
      const pairAddress = await contract.getPair(fromToken?.address, toAddress);
      if (pairAddress === '0x0000000000000000000000000000000000000000') {
        setPairAddress('');
      } else {
        setPairAddress(pairAddress);
      }
    }
  }, [fromToken?.address, toToken?.address]);

  useEffect(() => {
    if (fromToken?.address && toAddress) {
      getPairAddress();
    }
  }, [fromToken?.address, toAddress]);

  return {
    pairAddress,
  };
};

export default usePair;

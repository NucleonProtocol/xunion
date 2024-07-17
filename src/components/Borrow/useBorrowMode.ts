import { useState } from 'react';
import { BorrowModeType } from '@/types/slc.ts';
import { useAccount, useReadContract } from 'wagmi';
import { Abi, Address } from 'viem';

const useBorrowMode = (contact: { abi: Abi; address: Address }) => {
  const [mode, setMode] = useState<BorrowModeType>();

  const [open, setOpen] = useState(false);

  const { address } = useAccount();
  const { data } = useReadContract({
    address: contact.address,
    abi: contact.abi,
    functionName: 'userMode',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  return {
    open,
    setOpen,
    mode,
    setMode,
    effectiveMode: (data as number[])?.[0] || BorrowModeType.HighLiquidity,
  };
};

export default useBorrowMode;

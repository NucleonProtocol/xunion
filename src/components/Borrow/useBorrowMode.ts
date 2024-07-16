import { useState } from 'react';
import { BorrowMode } from '@/types/slc.ts';
import { useAccount, useReadContract } from 'wagmi';
import { XUNION_SLC_CONTRACT } from '@/contracts';
import { Address } from 'viem';

const useBorrowMode = () => {
  const [mode, setMode] = useState<BorrowMode>();

  const [open, setOpen] = useState(false);

  const { address } = useAccount();
  const { data } = useReadContract({
    address: XUNION_SLC_CONTRACT.interface.address as Address,
    abi: XUNION_SLC_CONTRACT.interface.abi,
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
    effectiveMode: (data as number[])?.[0] || BorrowMode.HighLiquidity,
  };
};

export default useBorrowMode;

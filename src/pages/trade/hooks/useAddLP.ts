import { useCallback, useEffect, useMemo, useState } from 'react';
import useLP from '@/pages/trade/hooks/useLP.ts';
import useErc20Balance, { formatNumber } from '@/hooks/useErc20Balance.ts';
import { Token } from '@/types/swap.ts';
import { formatEther, getAddress } from 'ethers';
import { isNumeric } from '@/utils/isNumeric.ts';

type Step = 'FILL' | 'CONFIRM';

export interface LpPairInfo {
  tokenALPTotal: string;
  tokenBLPTotal: string;
  pairAddress: string;
  lpTotalSupply: string;
  lpPair: string[];
}
export interface LiquidityReturnType {
  isReady: boolean;
  tokenA?: Token;
  tokenB?: Token;
  tokenAAmount: string;
  tokenBAmount: string;
  tokenAOwnerAmount: number;
  tokenBOwnerAmount: number;
  tokenASLCPairAddress?: string;
  tokenBSLCPairAddress?: string;
  onTokenBAmountChange: (amount: string) => void;
  onTokenAAmountChange: (amount: string) => void;
  onTokenBChange: (token: Token) => void;
  onTokenAChange: (token: Token) => void;
  invalidPool: boolean;
  isInsufficientLiquidity: boolean;
  shareOfPool: number;
  lpTokens: number;
  lpPairInfo?: LpPairInfo;
  step: Step;
  setStep: (step: Step) => void;
}

const useAddLP = (): LiquidityReturnType => {
  const [step, setStep] = useState<Step>('FILL');
  const { getBalance, getTotalSupply } = useErc20Balance();
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');
  const [tokenA, setTokenA] = useState<Token | undefined>();
  const [tokenB, setTokenB] = useState<Token | undefined>();
  const [tokenAOwnerAmount, setTokenAOwnerAmount] = useState(0);
  const [tokenBOwnerAmount, setTokenBOwnerAmount] = useState(0);
  const [invalidPool, setInvalidPool] = useState(false);
  const [isInsufficientLiquidity, setIsInsufficientLiquidity] = useState(false);
  const [tokenASLCPairAddress, setTokenAPairAddress] = useState<
    string | undefined
  >();
  const [tokenBSLCPairAddress, setTokenBPairAddress] = useState<
    string | undefined
  >();

  const [lpPairInfo, setLpPairInfo] = useState<LpPairInfo | undefined>();

  const { getSLCPairAddress, getLpReserve, getLpPair, getPairAddress } =
    useLP();

  useEffect(() => {
    if (tokenA?.address) {
      getBalance(tokenA.address).then(setTokenAOwnerAmount);
      getSLCPairAddress(tokenA.address).then(setTokenAPairAddress);
    }
  }, [tokenA]);
  useEffect(() => {
    if (tokenB?.address) {
      getBalance(tokenB.address).then(setTokenBOwnerAmount);
      getSLCPairAddress(tokenB.address).then(setTokenBPairAddress);
    }
  }, [tokenB]);

  const getLpTotal = async ({
    tokenAAddress,
    tokenBAddress,
  }: {
    tokenAAddress: string;
    tokenBAddress: string;
  }) => {
    const pairAddress: string = await getPairAddress(
      tokenAAddress,
      tokenBAddress
    );
    if (!pairAddress) {
      setIsInsufficientLiquidity(true);
      return;
    }
    const lpPair = await getLpPair(pairAddress);

    const totalSupply: bigint = await getTotalSupply(pairAddress);

    const lpTotalSupply = formatEther(totalSupply.toString());

    return getLpReserve(pairAddress).then((reserve) => {
      const invalid = reserve[0].every((unit: bigint) => unit === 0n);
      if (invalid) {
        setInvalidPool(invalid);
      } else {
        const tokenAPairIndex = lpPair.findIndex(
          (item) =>
            getAddress(item).toLowerCase() ===
            getAddress(tokenAAddress).toLowerCase()
        );
        const tokenBPairIndex = lpPair.findIndex(
          (item) =>
            getAddress(item).toLowerCase() ===
            getAddress(tokenBAddress).toLowerCase()
        );

        const tokenALPTotal = formatEther(
          reserve[0][tokenAPairIndex].toString()
        );
        const tokenBLPTotal = formatEther(
          reserve[0][tokenBPairIndex].toString()
        );

        return {
          tokenALPTotal,
          tokenBLPTotal,
          pairAddress,
          lpTotalSupply,
          lpPair,
        };
      }
    });
  };

  const onTokenAChange = useCallback(
    async (token: Token) => {
      setTokenA(token);
      setInvalidPool(false);
      setIsInsufficientLiquidity(false);
      setLpPairInfo(undefined);
      if (tokenB) {
        const res = await getLpTotal({
          tokenAAddress: token?.address,
          tokenBAddress: tokenB?.address,
        });
        setLpPairInfo(res);
        if (res) {
          const { tokenALPTotal, tokenBLPTotal } = res;
          if (tokenAAmount) {
            const tokenBAmountRef =
              (Number(tokenAAmount) / Number(tokenALPTotal)) *
              Number(tokenBLPTotal);
            const amount = formatNumber(tokenBAmountRef, 6).toString();
            setTokenBAmount(isNumeric(amount) ? amount : '');
          } else if (tokenBAmount) {
            const tokenAAmountRef =
              (Number(tokenBAmount) / Number(tokenBLPTotal)) *
              Number(tokenALPTotal);
            const amount = formatNumber(tokenAAmountRef, 6).toString();
            setTokenAAmount(isNumeric(amount) ? amount : '');
          }
        }
      }
    },
    [tokenAAmount, tokenB?.address, tokenBAmount]
  );

  const onTokenBChange = useCallback(
    async (token: Token) => {
      setTokenB(token);
      setInvalidPool(false);
      setIsInsufficientLiquidity(false);
      setLpPairInfo(undefined);
      if (tokenA) {
        const res = await getLpTotal({
          tokenAAddress: tokenA.address,
          tokenBAddress: token.address,
        });
        setLpPairInfo(res);
        if (res) {
          const { tokenALPTotal, tokenBLPTotal } = res;
          if (tokenBAmount) {
            const tokenAAmountRef =
              (Number(tokenBAmount) / Number(tokenBLPTotal)) *
              Number(tokenALPTotal);
            const amount = formatNumber(tokenAAmountRef, 6).toString();
            setTokenAAmount(isNumeric(amount) ? amount : '');
          } else if (tokenAAmount) {
            const tokenBAmountRef =
              (Number(tokenAAmount) / Number(tokenALPTotal)) *
              Number(tokenBLPTotal);
            const amount = formatNumber(tokenBAmountRef, 6).toString();
            setTokenBAmount(isNumeric(amount) ? amount : '');
          }
        }
      }
    },
    [tokenBAmount, tokenAAmount, tokenA?.address]
  );

  const onTokenAAmountChange = useCallback(
    (value: string) => {
      setTokenAAmount(value);
      setInvalidPool(false);
      setIsInsufficientLiquidity(false);
      if (tokenA && tokenB && lpPairInfo) {
        const { tokenALPTotal, tokenBLPTotal } = lpPairInfo;
        const tokenBAmount =
          (Number(value) / Number(tokenALPTotal)) * Number(tokenBLPTotal);
        const amount = formatNumber(tokenBAmount, 6).toString();
        setTokenBAmount(isNumeric(amount) ? amount : '');
      }
    },
    [tokenA?.address, tokenB?.address, lpPairInfo]
  );

  const onTokenBAmountChange = useCallback(
    (value: string) => {
      setTokenBAmount(value);
      setInvalidPool(false);
      setIsInsufficientLiquidity(false);
      if (tokenA && tokenB && lpPairInfo) {
        const { tokenALPTotal, tokenBLPTotal } = lpPairInfo;
        const tokenAAmount =
          (Number(value) / Number(tokenBLPTotal)) * Number(tokenALPTotal);
        const amount = formatNumber(tokenAAmount, 6).toString();
        setTokenAAmount(isNumeric(amount) ? amount : '');
      }
    },
    [tokenA?.address, tokenB?.address, lpPairInfo]
  );

  const isReady = useMemo(() => {
    return !!(
      isNumeric(tokenAAmount) &&
      isNumeric(tokenBAmount) &&
      tokenA?.address &&
      tokenB?.address
    );
  }, [tokenAAmount, tokenBAmount, tokenA, tokenB]);

  const shareOfPool = useMemo(() => {
    if (isNumeric(tokenAAmount) && lpPairInfo) {
      const { tokenALPTotal } = lpPairInfo;
      return formatNumber(
        (Number(tokenAAmount) /
          (Number(tokenAAmount) + Number(tokenALPTotal))) *
          100,
        2
      );
    }
    return 0;
  }, [lpPairInfo, tokenAAmount]);

  const lpTokens = useMemo(() => {
    if (isNumeric(tokenAAmount) && lpPairInfo) {
      const { lpTotalSupply, tokenALPTotal } = lpPairInfo;

      return formatNumber(
        (Number(tokenAAmount) / Number(tokenALPTotal)) * Number(lpTotalSupply),
        6
      );
    }
    return 0;
  }, [lpPairInfo, tokenAAmount]);

  return {
    isReady,
    tokenA,
    tokenB,
    tokenAAmount,
    tokenBAmount,
    tokenAOwnerAmount,
    tokenBOwnerAmount,
    tokenASLCPairAddress,
    tokenBSLCPairAddress,
    onTokenBAmountChange,
    onTokenAAmountChange,
    onTokenBChange,
    onTokenAChange,
    invalidPool,
    isInsufficientLiquidity,
    shareOfPool,
    lpTokens,
    step,
    setStep,
    lpPairInfo,
  };
};

export default useAddLP;

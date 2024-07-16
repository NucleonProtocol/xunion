import useTokensWithPrice from '@/hooks/useTokensWithPrice.ts';

const useSupplies = () => {
  const { tokens, isTokenLoading, loading } = useTokensWithPrice();

  return {
    tokens,
    loading: isTokenLoading || loading,
  };
};

export default useSupplies;

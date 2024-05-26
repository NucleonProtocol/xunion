import useInterfaceContract from '@/hooks/useInterfaceContract.ts';

const useExchangeAmount = () => {
  const contract = useInterfaceContract();

  const getInputAmount = async (tokens: string[], amount: string) => {
    return await contract.xExchangeEstimateInput(tokens, amount);
  };

  const getOutputAmount = async (tokens: string[], amount: string) => {
    return await contract.xExchangeEstimateOutput(tokens, amount);
  };

  return {
    getInputAmount,
    getOutputAmount,
  };
};

export default useExchangeAmount;

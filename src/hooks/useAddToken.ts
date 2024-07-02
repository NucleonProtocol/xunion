import { Token } from '@/types/swap.ts';

const useAddToken = () => {
  const addToken = async ({ address, symbol, decimals, icon }: Token) => {
    const { ethereum } = window;

    if (ethereum) {
      try {
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: address,
              symbol: symbol,
              decimals: decimals,
              image: icon,
            },
          },
        });

        if (wasAdded) {
          console.log('Token added!');
        } else {
          console.log('Token not added');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return { addToken };
};
export default useAddToken;

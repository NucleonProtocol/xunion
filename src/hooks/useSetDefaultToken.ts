import { Token } from '@/types/swap';
import { useSearchParams } from 'react-router-dom';
import useErc20Info from './useERC20TokenInfo';
import useTokenListStore from '@/store/tokens';
import { useEffect } from 'react';
import { Address, isAddress } from 'viem';

const useSetDefaultToken = (name: string, update: (token: Token) => void) => {
  const tokens = useTokenListStore((state) => state.tokens);

  const [params] = useSearchParams();
  const { fetchTokenInfo } = useErc20Info();

  useEffect(() => {
    if (name && params?.get(name) && tokens.length) {
      const address = params?.get(name) as Address;
      if (isAddress(address)) {
        const token = tokens.find(
          (item) => item?.address.toLowerCase() === address.toLowerCase()
        );
        if (token) {
          update(token);
        } else {
          fetchTokenInfo(address).then((res) => {
            if (res) {
              update(res);
            }
          });
        }
      }
    }
  }, [name, tokens]);
};

export default useSetDefaultToken;

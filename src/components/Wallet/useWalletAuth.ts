import { useAccount, useChainId } from 'wagmi';
import { usePersistStore } from '@/store/persist.ts';
import { BUTTON_ACCESS } from '@/types/auth.ts';

export const CHAIN_ID = 71; //eSpace testnet  71/ mian 1_030

const useWalletAuth = (
  access: BUTTON_ACCESS[] = [BUTTON_ACCESS.CONNECTED, BUTTON_ACCESS.CHAIN]
) => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { address } = useAccount();
  const wallet = usePersistStore((state) => state.wallet);

  const walletConnected =
    wallet &&
    !(!isConnected && !address && access.includes(BUTTON_ACCESS.CONNECTED));

  const isErrorNetwork =
    chainId !== CHAIN_ID && access.includes(BUTTON_ACCESS.CHAIN);

  const disabled = !walletConnected || isErrorNetwork;

  return {
    walletConnected,
    isErrorNetwork,
    disabled,
    CHAIN_ID,
  };
};

export default useWalletAuth;

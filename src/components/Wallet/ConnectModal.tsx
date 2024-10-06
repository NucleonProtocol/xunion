import useWalletStore from '@/store/wallet.ts';
import {
  WalletConnectIcon,
  CoinbaseIcon,
  BrowserWalletIcon,
  OKXWalletIcon,
} from '@/components/icons';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { useConnect } from 'wagmi';
import { usePersistStore } from '@/store/persist.ts';
import DrawerContainer from '@/components/DrawerContainer.tsx';

const ConnectModal = () => {
  const open = useWalletStore((state) => state.open);
  const onOpen = useWalletStore((state) => state.onOpen);
  const { connectAsync } = useConnect();
  const updateWallet = usePersistStore((state) => state.updateWallet);
  return (
    <DrawerContainer
      onClose={() => {
        onOpen(false);
      }}
      open={open}
    >
      <div>
        <p>Connect Wallet</p>
        <div className="mt-[20px] flex flex-col gap-[16px]">
          <div
            className="flex h-[72px] w-full cursor-pointer items-center gap-[16px] rounded-[8px] bg-fill-e-primary px-[20px]"
            onClick={() => {
              connectAsync({ connector: injected() }).then(() => {
                onOpen(false);
                updateWallet('metamask');
              });
            }}
          >
            <BrowserWalletIcon className="text-[40px]" />
            <span>Browser wallet</span>
          </div>

          <div
            className="flex h-[72px] w-full cursor-pointer items-center gap-[16px] rounded-[8px] bg-fill-e-primary px-[20px]"
            onClick={() => {
              connectAsync({
                connector: walletConnect({
                  projectId: '44f05d7b85fbbfb975c0c1273b7804e3',
                }),
              }).then(() => {
                onOpen(false);
                updateWallet('fluent');
              });
            }}
          >
            <WalletConnectIcon className="text-[40px]" />
            <span>WalletConnect</span>
          </div>

          <div
            className="flex h-[72px] w-full cursor-pointer items-center gap-[16px] rounded-[8px] bg-fill-e-primary px-[20px]"
            onClick={() => {
              connectAsync({
                connector: coinbaseWallet({
                  appName: 'x-union',
                }),
              }).then(() => {
                onOpen(false);
                updateWallet('fluent');
              });
            }}
          >
            <CoinbaseIcon className="text-[40px]" />
            <span>Coinbase Wallet</span>
          </div>

          <div
            className="flex h-[72px] w-full cursor-pointer items-center gap-[16px] rounded-[8px] bg-fill-e-primary px-[20px]"
            onClick={() => {
              connectAsync({ connector: injected() }).then(() => {
                onOpen(false);
                updateWallet('fluent');
              });
            }}
          >
            <OKXWalletIcon className="text-[40px]" />
            <span>OKX Wallet</span>
          </div>
        </div>
      </div>
    </DrawerContainer>
  );
};

export default ConnectModal;

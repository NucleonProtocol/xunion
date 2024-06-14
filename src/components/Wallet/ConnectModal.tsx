import useWalletStore from '@/store/wallet.ts';
import { MetamaskIcon, FluentIcon } from '@/components/icons';
import { injected } from 'wagmi/connectors';
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
            <MetamaskIcon className="text-[40px]" />
            <span>Metamask</span>
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
            <FluentIcon className="text-[40px]" />
            <span>Fluent</span>
          </div>
        </div>
      </div>
    </DrawerContainer>
  );
};

export default ConnectModal;

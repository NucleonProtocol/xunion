import useWalletStore from '@/store/wallet.ts';
import {
  MetamaskIcon,
  FluentIcon,
  AvatarIcon,
  TokenIcon,
} from '@/components/icons';
import { useAccount, useDisconnect } from 'wagmi';
import { usePersistStore } from '@/store/persist.ts';
import { formatCurrency, maskAddress4 } from '@/utils';
import { CopyOutlined, LogoutOutlined } from '@ant-design/icons';
import { useCopy } from '@/hooks/useCopy.ts';
import DrawerContainer from '@/components/DrawerContainer.tsx';
import useWalletDetail from '@/components/Wallet/useWalletDetail.ts';
import { cn } from '@/utils/classnames.ts';
import TokenList from '@/components/Wallet/TokenList.tsx';
import ActivityList from '@/components/Wallet/ActivityList.tsx';

const WalletDetailModal = () => {
  const open = useWalletStore((state) => state.detailOpen);
  const onOpen = useWalletStore((state) => state.onDetailOpen);
  const { disconnectAsync } = useDisconnect();
  const updateWallet = usePersistStore((state) => state.updateWallet);
  const wallet = usePersistStore((state) => state.wallet);
  const { address } = useAccount();
  const { copy } = useCopy();
  const { activities, tokens, loading, isTokenLoading, totalPrice } =
    useWalletDetail();

  return (
    address && (
      <DrawerContainer
        open={open}
        onClose={() => {
          onOpen(false);
        }}
      >
        <div className="h-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-[10px]">
              <div className="relative h-[40px] w-[40px]">
                <AvatarIcon className="text-[40px]" />
                <span className="absolute bottom-[-4px] right-[-2px] flex h-[20px]  w-[20px] items-center justify-center rounded-[10px] bg-fill-secondary text-[16px]">
                  {wallet === 'metamask' ? <MetamaskIcon /> : <FluentIcon />}
                </span>
              </div>
              <span className="flex items-center gap-[10px]">
                {maskAddress4(address)}
                <CopyOutlined
                  className="cursor-pointer hover:text-theme"
                  onClick={() => {
                    copy(address);
                  }}
                />
              </span>
            </div>
            <LogoutOutlined
              className="cursor-pointer text-[20px] hover:text-theme"
              onClick={() => {
                disconnectAsync().then(() => {
                  onOpen(false);
                  updateWallet(null);
                });
              }}
            />
          </div>

          <div className="mt-[20px] flex flex-col gap-[16px]">
            <div className="py-[10px] text-[24px] font-bold">{totalPrice}</div>
            {/*<div>*/}
            {/*  <span>Tokens</span>*/}
            {/*  <span>Activity</span>*/}
            {/*</div>*/}
            <TokenList tokens={tokens} loading={loading || isTokenLoading} />
            {/*<ActivityList*/}
            {/*  activities={activities?.items || []}*/}
            {/*  loading={loading || isTokenLoading}*/}
            {/*/>*/}
          </div>
        </div>
      </DrawerContainer>
    )
  );
};

export default WalletDetailModal;

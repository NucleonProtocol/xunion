import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CommonState {
  open: boolean;
  onOpen: (open: boolean) => void;
  detailOpen: boolean;
  onDetailOpen: (open: boolean) => void;
}

const useWalletStore = create<CommonState>()(
  immer((set) => ({
    open: false,
    onOpen: (open) =>
      set((state) => {
        state.open = open;
      }),
    detailOpen: false,
    onDetailOpen: (open) =>
      set((state) => {
        state.detailOpen = open;
      }),
  }))
);

export default useWalletStore;

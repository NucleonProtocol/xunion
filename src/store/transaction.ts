import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

interface Pending {
  hash: string;
  data?: {
    type: 'SWAP' | 'LIMIT';
  };
}
interface Submitted {
  hash: string;
  title?: string;
}
interface CommonState {
  pendingTransactions: Pending[];
  addPending: (tx: Pending) => void;
  removePending: (tx: Pending) => void;
  submittedTx?: Submitted | null;
  updateSubmitted: (submitted: Submitted | null) => void;
}

const useTxStore = create<CommonState>()(
  persist(
    immer((set) => ({
      pendingTransactions: [],
      submittedTx: null,
      addPending: (pending) =>
        set((state) => {
          state.pendingTransactions = [...state.pendingTransactions, pending];
        }),
      removePending: (pending) =>
        set((state) => {
          state.pendingTransactions = state.pendingTransactions.filter(
            (item) => item.hash === pending.hash
          );
        }),
      updateSubmitted: (submitted) =>
        set((state) => {
          state.submittedTx = submitted;
        }),
    })),
    {
      name: 'xunion-pending-transactions',
    }
  )
);

export default useTxStore;

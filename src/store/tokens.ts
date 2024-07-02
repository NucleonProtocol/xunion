import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Token } from '@/types/swap.ts';

interface State {
  tokens: Token[];
  updateTokens: (tokens: Token[]) => void;
}

const useTokenListStore = create<State>()(
  immer((set) => ({
    tokens: [],
    updateTokens: (tokens) =>
      set((state) => {
        state.tokens = tokens;
      }),
  }))
);

export default useTokenListStore;

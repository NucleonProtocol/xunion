import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CommonState {
  theme?: 'dark' | 'light' | string;
  updateTheme: (theme: string) => void;
}

export const useCommonStore = create<CommonState>()(
  immer((set) => ({
    theme: 'light',
    updateTheme: (theme) =>
      set((state) => {
        state.theme = theme;
      }),
  }))
);

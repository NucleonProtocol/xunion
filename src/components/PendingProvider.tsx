import { PropsWithChildren, useRef } from 'react';
import { StoreApi } from 'zustand';
import {
  createPendingStore,
  TXPendingContext,
  TxPendingState,
} from '@/store/pending.ts';

const TXPendingProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<TxPendingState>>();

  if (!storeRef.current) {
    storeRef.current = createPendingStore();
  }
  return (
    <TXPendingContext.Provider value={storeRef.current || null}>
      {children}
    </TXPendingContext.Provider>
  );
};

export default TXPendingProvider;

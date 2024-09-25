import SwapPanel from './SwapPanel';
import { useState } from 'react';
import SendingPanel from './SendingPanel';
import LimitPanel from './LimitPanel';

const SwapBox = () => {
  const [swapType, setSwapType] = useState<'limit' | 'swap' | 'send' | string>(
    'swap'
  );

  if (swapType === 'swap') {
    return <SwapPanel onSwapTypeChange={setSwapType} />;
  }
  if (swapType === 'send') {
    return <SendingPanel onSwapTypeChange={setSwapType} />;
  }
  return <LimitPanel onSwapTypeChange={setSwapType} />;
};

export default SwapBox;

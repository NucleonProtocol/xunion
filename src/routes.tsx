import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/Layout/PageLayout';
import Swap from 'src/pages/x-dex/swap';
import Limit from 'src/pages/x-dex/limit';
import Send from 'src/pages/x-dex/send';
import Pools from '@/pages/x-dex/pools';
import Liquidity from '@/pages/x-dex/liquidity';
import CreatePool from '@/pages/x-dex/create-pool';
import Explore from '@/pages/x-dex/explore';
import PoolTokenDetail from '@/pages/x-dex/explore/PoolTokenDetail.tsx';
import TokenDetail from '@/pages/x-dex/explore/TokenDetail.tsx';

import MintSLC from 'src/pages/x-super-libra-coin/mint';
import BurnSLC from 'src/pages/x-super-libra-coin/burn';
import SLCBorrow from '@/pages/x-super-libra-coin/borrow';
import Dashboard from '@/pages/x-lending/dashboad';
import Market from '@/pages/x-lending/market';
import MarketDetail from '@/pages/x-lending/market/MarketDetail';
import Listing from '@/pages/x-dex/create-pool/Listing';

const routes = [
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="x-dex" replace />,
      },
      {
        path: 'x-dex',
        children: [
          {
            path: '',
            element: <Navigate to="swap" replace />,
          },
          {
            path: 'swap',
            element: <Swap />,
          },
          {
            path: 'limit',
            element: <Limit />,
          },
          {
            path: 'send',
            element: <Send />,
          },
          {
            path: 'swap',
            element: <Swap />,
          },
          {
            path: 'liquidity',
            element: <Liquidity />,
          },
          {
            path: 'explore',
            element: <Explore />,
          },
          {
            path: 'explore/pool/:address',
            element: <PoolTokenDetail />,
          },
          {
            path: 'explore/token/:address',
            element: <TokenDetail />,
          },
          {
            path: 'pools',
            element: <Pools />,
          },
          {
            path: 'create-pool',
            element: <CreatePool />,
          },
          {
            path: 'listing',
            element: <Listing />,
          },
        ],
      },
      {
        path: 'x-super-libra-coin',
        children: [
          {
            path: '',
            element: <Navigate to="mint" replace />,
          },
          {
            path: 'mint',
            element: <MintSLC />,
          },
          {
            path: 'burn',
            element: <BurnSLC />,
          },
          {
            path: 'borrow',
            element: <SLCBorrow />,
          },
        ],
      },
      {
        path: 'x-lending',
        children: [
          {
            path: '',
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'market',
            element: <Market />,
          },
          {
            path: 'market/:address',
            element: <MarketDetail />,
          },
        ],
      },
    ],
  },
];

export default routes;

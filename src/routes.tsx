import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/Layout/PageLayout';
import Swap from '@/pages/trade/swap';
import Limit from '@/pages/trade/swap/limit';
import Send from '@/pages/trade/swap/send';
import Pools from '@/pages/trade/pools';
import Liquidity from '@/pages/trade/liquidity';
import CreatePool from 'src/pages/trade/create-pool';
import Explore from '@/pages/explore';
import SLCBuy from '@/pages/slc/buy';
import SLCSell from '@/pages/slc/sell';
import SLCBorrow from '@/pages/slc/borrow';

const routes = [
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="trade" replace />,
      },
      {
        path: 'trade',
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
            path: 'pools',
            element: <Pools />,
          },
          {
            path: 'liquidity',
            element: <Liquidity />,
          },
          {
            path: 'create-pool',
            element: <CreatePool />,
          },
        ],
      },
      {
        path: 'slc',
        children: [
          {
            path: '',
            element: <Navigate to="buy" replace />,
          },
          {
            path: 'buy',
            element: <SLCBuy />,
          },
          {
            path: 'sell',
            element: <SLCSell />,
          },
          {
            path: 'borrow',
            element: <SLCBorrow />,
          },
        ],
      },
      {
        path: 'explore',
        element: <Explore />,
      },
    ],
  },
];

export default routes;

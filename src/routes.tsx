import { Navigate } from 'react-router-dom';
import PageLayout from '@/components/Layout/PageLayout';
import Swap from '@/pages/trade/swap';
import Pools from '@/pages/trade/pools';
import Liquidity from '@/pages/trade/liquidity';
import CreatePool from '@/pages/trade/create-pool';
import Explore from '@/pages/explore';
import SLC from '@/pages/slc';

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
        element: <SLC />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
    ],
  },
];

export default routes;

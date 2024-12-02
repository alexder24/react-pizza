import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '@/layouts/Root';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '@/pages/Home'));
const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ '@/pages/Cart'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound'));
const DetailedPizza = lazy(() => import(/* webpackChunkName: "DetailedPizza" */ '@/pages/DetailedPizza'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home /> },
      { path: 'cart', element: <Cart /> },
      { path: 'pizza/:id', element: <DetailedPizza /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
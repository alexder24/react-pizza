import { createBrowserRouter } from 'react-router-dom';
import Root from '@/layouts/Root';
import Home from '@/pages/Home';
import Cart from '@/pages/Cart';
import NotFound from '@/pages/NotFound';
import DetailedPizza from '@/pages/DetailedPizza';

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
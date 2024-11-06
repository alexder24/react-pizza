import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home /> },
      { path: 'cart', element: <Cart /> },
      // Добавьте обработку "catch-all" маршрута
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
import { createBrowserRouter } from 'react-router-dom';
import Root from './layouts/Root';
import Home from './routes/Home';
import Cart from './routes/Cart';

const router = createBrowserRouter([
  { element: <Root />,
    children: [
      { path: '/', element: <Home />, },
      { path: '/cart', element: <Cart />, },
    ],
  },
]);

export default router;
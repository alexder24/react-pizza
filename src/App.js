import { RouterProvider } from 'react-router-dom';
import router from './router';
import './scss/app.scss';

export default function App() {
  return (
    <RouterProvider router={router} />
  );
};

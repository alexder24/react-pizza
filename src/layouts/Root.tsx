import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
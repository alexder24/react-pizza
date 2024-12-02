import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Loader } from '@/components';

export default function Root() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

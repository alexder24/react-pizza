import Header from '../../components/Header';
import NotFound from '../routes/NotFound';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <NotFound />            
          <Outlet />
        </div>
      </div>
    </div>
  );
}
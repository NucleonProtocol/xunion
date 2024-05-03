import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PageLayout;

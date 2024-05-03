import PageHeader from '@/components/Layout/PageHeader';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <div>
      <PageHeader />
      <Outlet />
    </div>
  );
};

export default PageLayout;

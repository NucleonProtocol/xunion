import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/classnames.ts';

export interface RouteTab {
  name: string;
  icon?: ReactNode;
  path: string;
}

const RouteTabs = ({ tabs, active }: { tabs: RouteTab[]; active: string }) => {
  return (
    <div className="flex-center gap-[40px]">
      {(tabs || []).map((tab) => (
        <Link
          to={tab.path}
          key={tab.name}
          className={cn(
            'flex-center h-[40px] gap-[12px] rounded-[20px] px-[16px] ',
            active === tab.name
              ? 'pointer-events-none bg-theme-non-opaque text-theme'
              : 'cursor-pointer hover:bg-theme-non-opaque hover:text-theme '
          )}
        >
          {tab.icon}
          <span>{tab.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default RouteTabs;

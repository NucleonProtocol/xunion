import { useTranslate } from '@/i18n';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/classnames.ts';

const SecondTabs = ({ active }: { active: 'Swap' | 'Limit' | 'Send' }) => {
  const { t } = useTranslate();

  const tabs = [
    { name: t('swap'), path: '/x-dex/swap' },
    {
      name: 'Limit',
      path: '/x-dex/limit',
    },
    {
      name: 'Send',
      path: '/x-dex/send',
    },
  ];

  return (
    <div className="flex-center gap-[10px]">
      {(tabs || []).map((tab) => (
        <Link
          to={tab.path}
          key={tab.name}
          className={cn(
            'flex-center h-[36px] rounded-[20px]  px-[16px] ',
            active === tab.name
              ? 'pointer-events-none bg-fill-primary  '
              : 'cursor-pointer text-tc-secondary hover:bg-fill-primary '
          )}
        >
          <span>{tab.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SecondTabs;

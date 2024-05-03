import Lang from '@/components/Lang';
import ThemeSwitcher from '@/components/Theme/ThemeSwitcher';
import { LogoIcon } from '@/components/icons';

const PageHeader = () => {
  return (
    <div className="flex h-[80px] px-[30px] py-[20px]">
      <LogoIcon />
      <Lang />
      <ThemeSwitcher />
    </div>
  );
};
export default PageHeader;

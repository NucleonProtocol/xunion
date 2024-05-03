import Link from 'next/link';
import Lang from '@/components/Lang';
import Theme from '@/components/Theme';
// import { LogoIcon } from '@/components/icons';

const PageHeader = () => {
  return (
    <div className="flex h-[80px] px-[30px] py-[20px]">
      {/*<LogoIcon />*/}
      <Lang />
      <Theme />
    </div>
  );
};
export default PageHeader;

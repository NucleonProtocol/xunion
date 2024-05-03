import Lang from '@/components/Lang';
import ThemeSwitcher from '@/components/Theme/ThemeSwitcher.tsx';
import { LogoIcon } from '@/components/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import Nav from '@/components/Header/Nav.tsx';

const Header = () => {
  return (
    <div className="py-[20px flex h-[80px] items-center justify-between px-[30px]">
      <Link to="/" className="flex-center gap-[5px]">
        <span className="text-[40px]">
          <LogoIcon />
        </span>
        <span className="text-[20px] font-bold">Xunion</span>
      </Link>
      <div className=" flex flex-1  items-center px-[60px]">
        <div>
          <Nav />
        </div>
      </div>
      <div className="flex-center">
        <Lang />
        <ThemeSwitcher />
        <ConnectButton />
      </div>
    </div>
  );
};
export default Header;

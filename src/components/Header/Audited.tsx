import beosin from '@/assets/images/Beosin.svg';
import github from '@/assets/images/Github.svg';
import salus from '@/assets/images/salus.svg';
import telegram from '@/assets/images/Telegram.svg';
import twitter from '@/assets/images/Twitter.svg';
import mail from '@/assets/images/mail.svg';

import beosind from '@/assets/images/Beosin-dark.svg';
import githubd from '@/assets/images/Github-dark.svg';
import salusd from '@/assets/images/salus-dark.svg';
import telegramd from '@/assets/images/Telegram-dark.svg';
import twitterd from '@/assets/images/Twitter-dark.svg';
import maild from '@/assets/images/mail-dark.svg';
import { Link } from 'react-router-dom';
import { usePersistStore } from '@/store/persist';

const Audited = () => {
  const theme = usePersistStore((state) => state.theme);
  return (
    <div className="pl-[30px]">
      <span className="py-[10px] text-tc-secondary">Audited by</span>
      <div className="my-[10px] flex  items-center justify-start gap-[20px]">
        <Link to="https://github.com/artixv/Xunion-Beosin-Audit">
          <img src={theme === 'dark' ? beosind : beosin} alt="" width={70} />
        </Link>
        <Link to="https://github.com/artixv/Xunion-Salus-Audit">
          <img src={theme === 'dark' ? salusd : salus} alt="" width={70} />
        </Link>
      </div>
      <div className="mt-[20px] flex gap-[10px] pb-[20px]">
        <Link to="https://x.com/xunionofficial">
          <img src={theme === 'dark' ? twitterd : twitter} alt="" />
        </Link>
        <Link to="https://t.me/ConfluxWeb3China">
          <img src={theme === 'dark' ? telegramd : telegram} alt="" />
        </Link>
        <Link to="https://github.com/artixv">
          <img src={theme === 'dark' ? githubd : github} alt="" />
        </Link>

        <Link to="hallo@xunion.io">
          <img src={theme === 'dark' ? maild : mail} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Audited;

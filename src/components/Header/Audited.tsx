import beosin from '@/assets/images/beosin.png';
import github from '@/assets/images/github.png';
import salus from '@/assets/images/salus.png';
import telegram from '@/assets/images/telegram.png';
import twitter from '@/assets/images/twitter.png';
import { Link } from 'react-router-dom';

const Audited = () => {
  return (
    <div className="pl-[30px]">
      <span className="py-[10px] text-tc-secondary">Audited by</span>
      <div className="my-[10px] flex  items-center justify-start gap-[20px]">
        <Link to="/">
          <img src={beosin} alt="" width={100} />
        </Link>
        <Link to="/">
          <img src={salus} alt="" width={100} />
        </Link>
      </div>
      <div className="mt-[20px] flex gap-[10px] pb-[20px]">
        <Link to="/">
          <img src={twitter} alt="" />
        </Link>
        <Link to="/">
          <img src={telegram} alt="" />
        </Link>
        <Link to="/">
          <img src={github} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Audited;

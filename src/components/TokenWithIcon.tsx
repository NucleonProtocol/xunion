import { TokenIcon } from '@/components/icons';
import { Token } from '@/types/swap.ts';

const TokenWithIcon = ({ token }: { token: Token }) => {
  return (
    <div className="flex items-center gap-[5px]">
      <TokenIcon src={token.icon} />
      <span>{token?.symbol}</span>
    </div>
  );
};

export default TokenWithIcon;

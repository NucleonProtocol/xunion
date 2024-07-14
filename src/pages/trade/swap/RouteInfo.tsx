import { SwapRoute } from '@/types/swap.ts';
import { TokenIcon } from '@/components/icons';
import { RightOutlined } from '@ant-design/icons';

const RouteInfo = ({ router }: { router?: SwapRoute }) => {
  const routes = router?.route || [];
  return (
    <div className="flex-center gap-[5px]">
      {routes.map((token, index) => (
        <div className="flex-center gap-[2px]">
          <span className="flex-center gap-[5px]">
            <TokenIcon src={token?.icon} />
            {token?.symbol}
          </span>
          {index < routes.length - 1 && <RightOutlined />}
        </div>
      ))}
    </div>
  );
};

export default RouteInfo;

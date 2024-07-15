import AmountCard from '@/components/AmountCard.tsx';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PoolList from '@/pages/x-dex/pools/PoolList.tsx';
import { useNavigate } from 'react-router-dom';

function Pools() {
  const navigate = useNavigate();
  return (
    <div className="mt-[30px] flex  min-h-[420px]  flex-col items-center p-[20px] ">
      <div className="max-md:mx-[20px] max-md:w-[calc(100%-40px)] md:min-w-[1200px]">
        <div className="flex-center-between pb-[32px]">
          <span className="text-[24px] font-bold">Liquidity pools</span>
          <Button
            icon={<PlusOutlined />}
            className="rounded-[20px]"
            type="primary"
            onClick={() => {
              navigate('/x-dex/create-pool');
            }}
          >
            Create Pool
          </Button>
        </div>
        <div className=" flex w-full items-center gap-[30px]">
          <AmountCard
            title="TVL"
            amount={278123123111.13444}
            loading={false}
            className="w-auto flex-1"
          />
          <AmountCard
            title="Volumn 24H"
            amount={78123123.144}
            loading={false}
            className="w-auto flex-1"
          />
        </div>
        <div>
          <PoolList />
        </div>
      </div>
    </div>
  );
}

export default Pools;

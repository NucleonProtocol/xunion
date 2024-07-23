import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const PoolFilter = ({
  onSearch,
}: {
  poolType: string;
  onPoolChange: (value: string) => void;
  onSearch: (value: string) => void;
}) => {
  return (
    <div className="flex-center-between mb-[20px] mt-[32px]">
      <div className="flex-center gap-[40px]">Assets</div>
      <div className="w-[300px]">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search name"
          className="rounded-[20px]"
          onBlur={(e) => {
            onSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default PoolFilter;

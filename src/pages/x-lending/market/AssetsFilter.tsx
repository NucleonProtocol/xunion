import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const AssetsFilter = ({ onChange }: { onChange: (value: string) => void }) => {
  return (
    <div className="flex-center-between mb-[20px] mt-[32px]">
      <div className="flex-center gap-[40px]">Assets</div>
      <div className="w-[300px]">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search name"
          className="rounded-[20px]"
          onBlur={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default AssetsFilter;

import { Input, Popover, Tooltip } from 'antd';
import { SettingIcon } from '@/components/icons';
import { QuestionCircleOutlined } from '@ant-design/icons';

const Slippage = () => {
  return (
    <Popover
      content={
        <div className="min-h-[160px] w-[400px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex-center-between">
              <div className="flex items-center gap-[10px]">
                <span>Slippage tolerance</span>
                <Tooltip
                  title="Your transaction will revert if the price changes unfavorably by more than this percentage."
                  placement="top"
                >
                  <QuestionCircleOutlined className="cursor-pointer text-tc-secondary" />
                </Tooltip>
              </div>
              <div>
                <span className="text-tc-secondary">0.1%</span>
              </div>
            </div>
            <div>
              <Input />
            </div>
          </div>
          <div className="mt-[20px] flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <span>Transaction deadline</span>
              <Tooltip
                title="Your transaction will revert if it is pending for more than this period of time."
                placement="top"
              >
                <QuestionCircleOutlined className="cursor-pointer text-tc-secondary" />
              </Tooltip>
            </div>
            <div>
              <Input />
            </div>
          </div>
        </div>
      }
      trigger={['click']}
      placement="bottomRight"
    >
      <div className="flex-center gap-[5px]">
        <span className="text-[14px] text-tc-secondary">0.1%</span>
        <SettingIcon className="cursor-pointer hover:text-theme" />
      </div>
    </Popover>
  );
};

export default Slippage;

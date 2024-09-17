import { NotificationOutlined } from '@ant-design/icons';
import { PropsWithChildren } from 'react';

const Info = ({ children }: PropsWithChildren) => {
  return (
    <div className="border-1 flex rounded-[8px] border border-theme p-[12px] text-[14px]">
      <div className="pr-[5px]">
        <NotificationOutlined className="text-theme" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Info;

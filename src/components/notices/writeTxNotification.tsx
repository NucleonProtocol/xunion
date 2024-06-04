import { notification } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

export const confluxScan = 'https://evmtestnet.confluxscan.io/tx/';

export const writeTxNotification = (hash: string) => {
  notification.open({
    message: (
      <div className="flex items-start justify-between gap-[20px]">
        <div className="flex-start">
          <CheckCircleFilled className="text-[24px] text-theme" />
        </div>
        <div className="flex flex-1 flex-col gap-[10px]">
          <span className="font-bold">Write Contract</span>
          <a
            href={`${confluxScan}${hash}`}
            className="text-theme hover:opacity-75"
            target="_blank"
          >
            View on ConfluxScan
          </a>
        </div>
      </div>
    ),
    duration: 10,
  });
};

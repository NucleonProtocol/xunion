import { notification } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

export const confluxScan = 'https://evmtestnet.confluxscan.io/tx/';

export const writeTxErrorNotification = (hash: string | null | undefined) => {
  notification.open({
    message: (
      <div className="flex items-start justify-between gap-[20px]">
        <div className="flex-start">
          <CloseCircleFilled className="text-[24px] text-red-600" />
        </div>
        <div className="flex flex-1 flex-col gap-[10px]">
          <span className="font-bold">Write Error</span>

          {hash ? (
            <a
              href={`${confluxScan}${hash}`}
              className="text-tc-secondary hover:opacity-75"
              target="_blank"
            >
              View on ConfluxScan
            </a>
          ) : (
            <span className="text-tc-secondary">Unknown message. </span>
          )}
        </div>
      </div>
    ),
    duration: 10,
  });
};

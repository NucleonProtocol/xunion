import { ActivityRecord, ActivityRecordType } from '@/types/activity.ts';
import { Skeleton } from 'antd';
import { cn } from '@/utils/classnames.ts';
import { TokenIcon } from '@/components/icons';
import { formatCurrency } from '@/utils';
import TimeAgo from '@/components/Wallet/TimeAgo.tsx';

const ActivityNames = {
  [ActivityRecordType.ADD_LIQUIDITY]: 'Add',
  [ActivityRecordType.SEND_TOKEN]: 'Send',
  [ActivityRecordType.RECEIVED_TOKEN]: 'Received',
  [ActivityRecordType.LIMIT]: 'Limit',
  [ActivityRecordType.APPROVE_TOKEN]: 'Approved',
  [ActivityRecordType.CREATE_POOL]: 'Create',
  [ActivityRecordType.REDUCE_LIQUIDITY]: 'Reduce',
  [ActivityRecordType.SWAP_TOKEN]: 'Swap',
};

const ActivityItem = ({ item }: { item: ActivityRecord }) => {
  if (item.type === ActivityRecordType.ADD_LIQUIDITY) {
    return 1;
  }
  return (
    <div
      className={cn('flex-center gap-[10px] rounded-[12px]')}
      key={item.date}
    >
      <div className="h-full w-[35px]">
        <TokenIcon src={item.icon} width={35} height={35} />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-[14px]"> {item.type}</span>
        <span className="text-[12px] text-tc-secondary">
          {/*<span>{`${item.amount} ${item.symbol}`}</span>*/}
        </span>
      </div>
      <div className="flex items-center gap-[20px] text-[14px]">
        {/*{formatCurrency(item.time || 0)}*/}
        <TimeAgo date={Number(item.date)} />
      </div>
    </div>
  );
};

const ActivityList = ({
  activities,
  loading,
}: {
  activities: ActivityRecord[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="w-full">
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[15px]">
      {activities.map((item) => (
        <ActivityItem key={item.date} item={item} />
      ))}
    </div>
  );
};

export default ActivityList;

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface TimeAgoProps {
  date: number;
}

const TimeAgo = ({ date }: TimeAgoProps) => {
  return <div>{dayjs().from(dayjs.unix(date), true)}</div>;
};

export default TimeAgo;

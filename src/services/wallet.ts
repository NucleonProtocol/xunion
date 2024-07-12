import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import { ActivityRecord } from '@/types/activity.ts';

export const getActivity = async (params: {
  pageSize: number;
  pageNum: number;
  address?: string;
}) => {
  return request
    .get<
      ResponseType<ListType<ActivityRecord>>
    >('/v1/wallet/portfolio/activity', { params })
    .then((res) => res.data?.data);
};

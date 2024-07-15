import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import { PoolType } from '@/types/pool.ts';

export const getAllPools = async (params: {
  pageSize: number;
  pageNum: number;
  nameOrAddress?: string;
}) => {
  return request
    .get<ResponseType<ListType<PoolType>>>('/v1/pairs', { params })
    .then((res) => res.data?.data);
};

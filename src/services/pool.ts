import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import { PoolAllInfo, PoolType } from '@/types/pool.ts';

export const getAllPools = async (params: {
  pageSize: number;
  pageNum: number;
  nameOrAddress?: string;
}) => {
  return request
    .get<ResponseType<ListType<PoolType>>>('/pairs', { params })
    .then((res) => res.data?.data);
};
export const getWalletPools = async (params: {
  pageSize: number;
  pageNum: number;
  address: string;
}) => {
  return request
    .get<ResponseType<ListType<PoolType>>>('/wallet/lp', { params })
    .then((res) => res.data?.data);
};

export const getAllPoolInfo = async () => {
  return request
    .get<ResponseType<PoolAllInfo>>('/lp/all/info')
    .then((res) => res.data?.data);
};

import { request } from '@/services/request.ts';
import { Token } from '@/types/swap.ts';
import { ResponseType, ListType } from '@/types/common.ts';

export const getTokenList = (params: {
  pageSize: number;
  pageNum: number;
  nameOrAddress?: string;
}) => {
  return request
    .get<ResponseType<ListType<Token>>>('/v1/tokens', { params })
    .then((res) => res.data?.data);
};

export const getTokenListCollect = (params: {
  pageSize: number;
  pageNum: number;
  ownerAddress: string;
}) => {
  return request
    .get<ResponseType<ListType<Token>>>('/tokens/collect', { params })
    .then((res) => res.data?.data);
};

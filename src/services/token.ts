import { request } from '@/services/request.ts';
import { Token } from '@/types/swap.ts';
import { ResponseType, ListType } from '@/types/common.ts';

export const getTokenList = async (params: {
  pageSize: number;
  pageNum: number;
  nameOrAddress?: string;
}) => {
  return request
    .get<ResponseType<ListType<Token>>>('/v1/tokens', { params })
    .then((res) => res.data?.data);
};

export const getTokenListCollect = async (params: {
  pageSize: number;
  pageNum: number;
  ownerAddress: string;
}) => {
  return request
    .get<ResponseType<ListType<Token>>>('/v1/tokens/collect', { params })
    .then((res) => res.data?.data);
};

export const getSwapRouter = async (params: {
  tokena: number;
  tokenb: number;
  pageSize: number;
  pageNum: number;
}) => {
  return request
    .get<ResponseType<ListType<Token>>>('/v1/tokens/router', { params })
    .then((res) => res.data?.data);
};

import { request } from '@/services/request.ts';
import { SwapRoute, Token } from '@/types/swap.ts';
import { ResponseType, ListType } from '@/types/common.ts';

export const getTokenList = async (params: {
  pageSize: number;
  pageNum: number;
  nameOrAddress?: string;
}) => {
  return request
    .get<ResponseType<ListType<Token>>>('/tokens', { params })
    .then((res) => res.data?.data);
};

export const getTokenListCollect = async (params: {
  pageSize: number;
  pageNum: number;
  ownerAddress: string;
}) => {
  return request
    .get<ResponseType<ListType<Token>>>('/tokens/collect', { params })
    .then((res) => res.data?.data);
};

export const getSwapRouter = async (params: {
  tokena: string;
  tokenb: string;
}) => {
  return request
    .get<ResponseType<ListType<SwapRoute>>>('/tokens/router', { params })
    .then((res) => res.data?.data?.items || []);
};

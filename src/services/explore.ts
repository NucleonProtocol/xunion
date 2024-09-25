import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import {
  Recently,
  TokenPrice,
  TokenTrade,
  TokenTVL,
  TokenVolume,
} from '@/types/explore';
import { PoolType } from '@/types/pool';

export const getTokenTVLStatistics = async (params: {
  recently?: Recently;
}) => {
  return request
    .get<
      ResponseType<ListType<TokenTVL>>
    >('/tokens/all/statistics', { params: { ...params, type: 0, pageNum: 1, pageSize: 100 } })
    .then((res) => res.data?.data);
};

export const getTokenVOLStatistics = async (params: {
  recently?: Recently;
}) => {
  return request
    .get<
      ResponseType<ListType<TokenVolume>>
    >('/tokens/all/statistics', { params: { ...params, type: 1, pageNum: 1, pageSize: 100 } })
    .then((res) => res.data?.data);
};

export const getTokenTradeList = async (params: { address: string }) => {
  return request
    .get<
      ResponseType<ListType<TokenTrade>>
    >('/tokens/swap/activity', { params })
    .then((res) => res.data?.data);
};

export const getTokenTVL = async (params: {
  token: string;
  recently: Recently;
}) => {
  return request
    .get<ResponseType<ListType<TokenTVL>>>('/tokens/statistics/tvl', { params })
    .then((res) => res.data?.data);
};

export const getTokenVOL = async (params: {
  token: string;
  recently: Recently;
}) => {
  return request
    .get<
      ResponseType<ListType<TokenVolume>>
    >('/tokens/statistics/tvl', { params })
    .then((res) => res.data?.data);
};

export const getTokenPrice = async (params: {
  token: string;
  recently: Recently;
}) => {
  return request
    .get<
      ResponseType<ListType<TokenPrice>>
    >('/tokens/statistics/price', { params })
    .then((res) => res.data?.data);
};

export const getPairTVL = async (params: { address: string }) => {
  return request
    .get<
      ResponseType<ListType<TokenTrade>>
    >('/pairs/statistics/tvl', { params })
    .then((res) => res.data?.data);
};

export const getPairVOL = async (params: { address: string }) => {
  return request
    .get<
      ResponseType<ListType<TokenTrade>>
    >('/pairs/statistics/volume', { params })
    .then((res) => res.data?.data);
};
export const getTokenPairs = async (params: { token: string }) => {
  return request
    .get<ResponseType<ListType<PoolType>>>('/pairs/bytoken', { params })
    .then((res) => res.data?.data);
};

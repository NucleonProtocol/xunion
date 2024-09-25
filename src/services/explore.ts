import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import { Recently, TokenTVL, TokenVolume } from '@/types/explore';

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

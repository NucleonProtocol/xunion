import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import { LendingAsset } from '@/types/Lending.ts';

export const getLendingAssets = async (params: {
  pageSize: number;
  pageNum: number;
}) => {
  return request
    .get<ResponseType<ListType<LendingAsset>>>('/v1/lending', { params })
    .then((res) => res.data?.data);
};

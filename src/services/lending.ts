import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import { LendingAsset, LendingAssetInterest } from '@/types/Lending.ts';

export const getLendingAssets = async (params: {
  pageSize: number;
  pageNum: number;
}) => {
  return request
    .get<ResponseType<ListType<LendingAsset>>>('/lending', { params })
    .then((res) => res.data?.data);
};

export const getLendingTokenGroup = async () => {
  return request
    .get<ResponseType<ListType<LendingAsset[]>>>('/lending/group')
    .then((res) => res.data?.data);
};

export const getAssetInterest = async (params: { token: string }) => {
  return request
    .get<
      ResponseType<ListType<LendingAssetInterest>>
    >('/deposit_loan_interest', { params })
    .then((res) => res.data?.data);
};

import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import { SLCAsset } from '@/types/slc.ts';

export const getTokenList = async () => {
  return request
    .get<ResponseType<ListType<SLCAsset>>>('/v1/tokens/licensed')
    .then((res) => res.data?.data);
};

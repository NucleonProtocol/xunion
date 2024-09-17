import { request } from '@/services/request.ts';
import { ResponseType, ListType } from '@/types/common.ts';
import { SLCAsset } from '@/types/slc.ts';

export const getTokenList = async () => {
  return request
    .get<ResponseType<ListType<SLCAsset>>>('/tokens/licensed')
    .then((res) => res.data?.data);
};

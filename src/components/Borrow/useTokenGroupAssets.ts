import { useMutation } from '@tanstack/react-query';
import { getLendingTokenGroup } from '@/services/lending.ts';
import { useEffect } from 'react';

const useTokenGroupAssets = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: getLendingTokenGroup,
  });
  useEffect(() => {
    mutate();
  }, []);

  return { assets: data?.items || [], isPending };
};

export default useTokenGroupAssets;

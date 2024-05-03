import { useIntl } from 'react-intl';
import { useCallback } from 'react';
import { TranslationKey } from './flattenMessages';

export const useTranslate = () => {
  const { formatMessage } = useIntl();
  const t = useCallback(
    // @ts-ignore
    (key: TranslationKey, values?: Record<string, string | number>) =>
      formatMessage({ id: key }, values),
    [formatMessage]
  );

  return { t };
};

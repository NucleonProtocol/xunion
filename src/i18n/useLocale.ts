import { useCallback, useMemo } from 'react';
import { flattenMessages } from './flattenMessages';
import { Locale, messages } from '@/i18n/index';
import { usePersistStore } from '@/store/persist.ts';

export const useLocale = () => {
  const locale = usePersistStore((state) => state.locale);
  const updateLocale = usePersistStore((state) => state.updateLocale);
  const flattenedMessages = useMemo(
    () => flattenMessages(messages[locale as keyof typeof messages]),
    [locale]
  );
  const switchLocale = useCallback(
    (currentLocal: Locale) => {
      if (currentLocal === locale) {
        return;
      }
      updateLocale(currentLocal);
    },
    [locale]
  );

  return {
    locale: locale || 'en-US',
    switchLocale,
    messages: flattenedMessages,
  };
};

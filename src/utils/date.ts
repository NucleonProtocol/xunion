import { Locale } from '@/i18n';

export const formatMonthDay = (value: string, lang: Locale) => {
  return new Date(value).toLocaleDateString(lang, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

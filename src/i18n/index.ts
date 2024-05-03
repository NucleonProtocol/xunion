import { INestedMessages } from '@/i18n/flattenMessages';
import { type Locale as RainbowType } from '@rainbow-me/rainbowkit';
import enUS from '@/i18n/locales/en-US.json';
import zhCN from '@/i18n/locales/zh-CN.json';
import zhHK from '@/i18n/locales/zh-HK.json';

export type Locale =
  | ('en-US' | 'zh-CN' | 'zh-HK')
  | RainbowType
  | (string & NonNullable<unknown>);

export const messages: Record<Locale | string, INestedMessages> = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'zh-HK': zhHK,
};

export const locales = Object.keys(messages);

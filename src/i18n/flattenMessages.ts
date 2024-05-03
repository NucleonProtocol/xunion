import en from './locales/en-US.json';

type KeyPaths<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? // @ts-ignore
      `${K & string}.${KeyPaths<T[K]> & string}`
    : K;
}[keyof T];

export type TranslationKey = KeyPaths<typeof en>;

export interface INestedMessages {
  [key: string]: string | INestedMessages;
}
export const flattenMessages = (
  nestedMessages: INestedMessages,
  prefix = ''
): Record<string, string> => {
  return Object.keys(nestedMessages).reduce(
    (messages: Record<string, string>, key) => {
      const value = nestedMessages[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }
      return messages;
    },
    {}
  );
};

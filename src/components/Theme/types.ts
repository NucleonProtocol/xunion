import * as React from 'react';

interface ValueObject {
  [themeName: string]: string;
}

export interface UseThemeProps {
  themes: string[];
  forcedTheme?: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme?: string | undefined;
  resolvedTheme?: string | undefined;
  systemTheme?: 'dark' | 'light' | undefined;
}

export type Attribute = `data-${string}` | 'class';

export interface ThemeProviderProps extends React.PropsWithChildren {
  themes?: string[] | undefined;
  forcedTheme?: string | undefined;
  enableSystem?: boolean | undefined;
  disableTransitionOnChange?: boolean | undefined;
  enableColorScheme?: boolean | undefined;
  storageKey?: string | undefined;
  defaultTheme?: string | undefined;
  attribute?: Attribute | Attribute[] | undefined;
  value?: ValueObject | undefined;
  nonce?: string | undefined;
}

import {
  darkTheme,
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  bsc,
  confluxESpace,
  confluxESpaceTestnet,
  mainnet,
  opBNB,
  optimism,
  polygon,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Locale } from '@/i18n';
import { WagmiProvider } from 'wagmi';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@/components/Theme';
import { useLocale } from '@/i18n/useLocale';

const ENV = {
  WGAMI_ALCHEMY_ID: 'DUZgv5C2XKSeRiBytiIwGKs5QA3nuw8L',
  WGAMI_PROJECT_ID: '829c5a9ab765c446bf1d8fb97a47d620',
};
const config = getDefaultConfig({
  appName: 'Xunion',
  projectId: ENV.WGAMI_PROJECT_ID,

  chains: [
    mainnet,
    polygon,
    optimism,
    base,
    confluxESpace,
    confluxESpaceTestnet,
    bsc,
    opBNB,
    arbitrum,
  ],
  ssr: true,
});

const queryClient = new QueryClient();

const Dapp = ({
  children,
  locale,
  isDark,
}: PropsWithChildren<{ locale: Locale; isDark: boolean }>) => {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
        algorithm: [
          isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        ],
        token: {
          colorPrimary: '#6E5DE6',
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={isDark ? darkTheme() : lightTheme()}
            locale={locale === 'zh-HK' ? 'en-US' : (locale as any)}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
  );
};

const Providers = () => {
  const { locale, messages } = useLocale();

  return (
    <ThemeProvider attribute="data-theme">
      <IntlProvider
        locale={locale}
        messages={messages}
        fallbackOnEmptyString
        defaultLocale="en"
      >
        <Dapp isDark locale={locale}>
          <div>123123</div>
        </Dapp>
      </IntlProvider>
    </ThemeProvider>
  );
};
export default Providers;

import { PropsWithChildren } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { confluxESpace, confluxESpaceTestnet, mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Locale, useLocale } from '@/i18n';
import { WagmiProvider } from 'wagmi';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { injected } from 'wagmi/connectors';
import { IntlProvider } from 'react-intl';
import { createConfig, http } from 'wagmi';

import { ThemeProvider, useTheme } from '@/components/Theme';
import routes from './routes';
import ConnectModal from '@/components/Wallet/ConnectModal.tsx';
import WalletDetailModal from '@/components/Wallet/WalletDetailModal.tsx';

const Routes = () => useRoutes(routes);

const config = createConfig({
  chains: [mainnet, confluxESpaceTestnet, confluxESpace],
  connectors: [injected({ shimDisconnect: false })],
  transports: {
    [mainnet.id]: http(),
    [confluxESpaceTestnet.id]: http(),
    [confluxESpace.id]: http(),
  },
});

const queryClient = new QueryClient();

const Dapp = ({ children }: PropsWithChildren<{ locale: Locale }>) => {
  const { systemTheme, theme } = useTheme();

  const isDark = theme === 'system' ? systemTheme === 'dark' : theme === 'dark';

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
          <ConnectModal />
          <WalletDetailModal />
          {children}
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
        defaultLocale="en-US"
      >
        <Dapp locale={locale}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Dapp>
      </IntlProvider>
    </ThemeProvider>
  );
};
export default Providers;

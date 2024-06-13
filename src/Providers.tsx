import { PropsWithChildren } from 'react';
import { useRoutes, HashRouter } from 'react-router-dom';
import { confluxESpace, confluxESpaceTestnet, mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Locale, useLocale } from '@/i18n';
import { useAccount, WagmiProvider } from 'wagmi';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { injected } from 'wagmi/connectors';
import { IntlProvider } from 'react-intl';
import { createConfig, http } from 'wagmi';

import { ThemeProvider, useTheme } from '@/components/Theme';
import routes from './routes';
import ConnectModal from '@/components/Wallet/ConnectModal.tsx';
import WalletDetailModal from '@/components/Wallet/WalletDetailModal.tsx';
import SubmittedModal from '@/components/modals/SubmittedModal.tsx';
import { E_SPACE_TEST_RPC } from '@/contracts';

const Routes = () => useRoutes(routes);

const config = createConfig({
  chains: [
    mainnet,
    {
      ...confluxESpaceTestnet,
      rpcUrls: {
        default: {
          http: [E_SPACE_TEST_RPC],
          webSocket: ['wss://evmtestnet.confluxrpc.org/ws'],
        },
      },
    },
    confluxESpace,
  ],
  connectors: [injected({ shimDisconnect: false })],
  transports: {
    [mainnet.id]: http(),
    [confluxESpaceTestnet.id]: http(),
    [confluxESpace.id]: http(),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      retryOnMount: false,
      refetchOnMount: false,
    },
  },
});

const Dapp = ({ children }: PropsWithChildren<{ locale: Locale }>) => {
  const { systemTheme, theme } = useTheme();
  const { address } = useAccount();

  const isDark = theme === 'system' ? systemTheme === 'dark' : theme === 'dark';

  return (
    <ConfigProvider
      key={address}
      wave={{ disabled: true }}
      theme={{
        cssVar: true,
        hashed: false,
        algorithm: [
          isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        ],
        token: {
          colorPrimary: '#6E5DE6',
        },
        components: {
          Button: {
            controlHeightLG: 56,
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ConnectModal />
        <SubmittedModal />
        <WalletDetailModal />
        {children}
      </QueryClientProvider>
    </ConfigProvider>
  );
};

const Providers = () => {
  const { locale, messages } = useLocale();

  return (
    <WagmiProvider config={config}>
      <ThemeProvider attribute="data-theme">
        <IntlProvider
          locale={locale}
          messages={messages}
          fallbackOnEmptyString
          defaultLocale="en-US"
        >
          <Dapp locale={locale}>
            <HashRouter>
              <Routes />
            </HashRouter>
          </Dapp>
        </IntlProvider>
      </ThemeProvider>
    </WagmiProvider>
  );
};
export default Providers;

import { Web3ReactProvider } from '@web3-react/core';
import { ReactNode, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClientProvider, QueryClient } from 'react-query';

import { AuthProvider } from '../auth/provider';
import { i18n } from '../i18n';
import { NotificationsProvider } from '../notifications/provider';
import { getLibrary } from '../web3/utils';

export type ProviderProps = {
  children?: ReactNode;
};

const queryClient = new QueryClient();

export function Provider(props: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <I18nextProvider i18n={i18n}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <NotificationsProvider>
              <AuthProvider>{props.children}</AuthProvider>
            </NotificationsProvider>
          </Web3ReactProvider>
        </I18nextProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

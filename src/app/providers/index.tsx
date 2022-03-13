import { Web3ReactProvider } from '@web3-react/core';
import { ReactNode, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AuthProvider } from '../auth/provider';
import { i18n } from '../i18n';
import { getLibrary } from '../web3/utils';

export type ProviderProps = {
  children?: ReactNode;
};

const queryClient = new QueryClient();

export function Provider(props: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={null}>
        <I18nextProvider i18n={i18n}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <AuthProvider>{props.children}</AuthProvider>
          </Web3ReactProvider>
        </I18nextProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

import { NoEthereumProviderError } from '@web3-react/injected-connector';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';

import { chainData, ethereum, injectedConnector } from '../web3/config';
import { useWeb3 } from '../web3/hooks';

import { clearDisconnected, isDisconnected, setDisconnected } from './utils';

const Auth = createContainer(() => {
  const [eager, setEager] = useState(false);
  const { account, activate, error, deactivate } = useWeb3();
  const computedError = useMemo(() => {
    if (error instanceof NoEthereumProviderError) {
      return new Error('No Ethereum provider was found');
    }

    return error;
  }, [error]);

  const connect = useCallback(async () => {
    clearDisconnected();
    if (ethereum?.isMetaMask) {
      await ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [chainData],
        })
        .catch(console.error);
      await ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainData.chainId }],
        })
        .catch(console.error);
    }
    return activate(injectedConnector);
  }, [activate]);

  const disconnect = useCallback(() => {
    deactivate();
    setDisconnected();
  }, [deactivate]);

  useEffect(() => {
    if (!eager) {
      injectedConnector
        .isAuthorized()
        .then(async (authorized) => {
          if (authorized && isDisconnected()) {
            return;
          }

          await connect();
        })
        .finally(() => setEager(true));
    }
  }, [connect, eager]);

  return { account, connect, disconnect, error: computedError, eager };
});

export const AuthProvider = Auth.Provider;
export const useAuth = Auth.useContainer;

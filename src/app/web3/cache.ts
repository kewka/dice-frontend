import { useQuery, UseQueryOptions } from 'react-query';

import { useWeb3 } from './hooks';

export function useBalance(address?: string | null, opts?: UseQueryOptions) {
  const { library } = useWeb3();
  return useQuery(['balance', address], () => library!.getBalance(address!), {
    enabled: !!address,
    refreshInterval: 3000,
    ...(opts as any),
  });
}

export function useAccountBalance(opts?: UseQueryOptions) {
  const { account } = useWeb3();
  return useBalance(account, opts);
}

import { useQuery, UseQueryOptions } from 'react-query';

import { useWeb3 } from './hooks';

export function useBalance(address?: string | null, options?: UseQueryOptions) {
  const { library } = useWeb3();
  return useQuery(['balance', address], () => library!.getBalance(address!), {
    enabled: Boolean(address && library),
    ...(options as any),
  });
}

export function useAccountBalance(options?: UseQueryOptions) {
  const { account } = useWeb3();
  return useBalance(account, options);
}

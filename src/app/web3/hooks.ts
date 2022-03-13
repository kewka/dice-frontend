import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useMemo } from 'react';

import { networkLibrary } from './config';
import { getLibrary } from './utils';

export function useWeb3() {
  return useWeb3React<ReturnType<typeof getLibrary>>();
}

export function useLibrary() {
  const { library } = useWeb3();
  return library ?? networkLibrary;
}

export function useContract(address: string, abi: any[]) {
  const { account } = useWeb3();
  const library = useLibrary();
  return useMemo(
    () =>
      new ethers.Contract(
        address,
        new ethers.utils.Interface(abi),
        account ? library.getSigner(account).connectUnchecked() : library
      ),
    [abi, account, address, library]
  );
}

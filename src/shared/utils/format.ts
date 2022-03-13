import { formatEther } from 'ethers/lib/utils';

import type { BigNumber } from 'ethers';

export function formatAddress(address: string, start = 5, end = 4): string {
  return (
    address.substring(0, start) +
    '...' +
    address.substring(address.length - end)
  );
}

export function formatCurrency(
  value: BigNumber,
  currencySymbol: string
): string {
  return formatEther(value) + ' ' + currencySymbol;
}

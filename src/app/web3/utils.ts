import { ethers } from 'ethers';

export function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  return library;
}

export function isZeroAddress(address: string): boolean {
  return address === ethers.constants.AddressZero;
}

export function isNotZeroAddress(address: string): boolean {
  return !isZeroAddress(address);
}

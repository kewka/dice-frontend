import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

import { getLibrary } from './utils';

export { default as MULTICALL_ABI } from '../abis/Multicall.json';

export enum ChainId {
  Mainnet = 56,
  Testnet = 97,
}

export const CHAIN_NAMES: Record<ChainId, string> = {
  [ChainId.Mainnet]: 'Binance Smart Chain Mainnet',
  [ChainId.Testnet]: 'Binance Smart Chain Testnet',
};

export const EXPLORERS: Record<ChainId, string> = {
  [ChainId.Mainnet]: 'https://bscscan.com',
  [ChainId.Testnet]: 'https://testnet.bscscan.com',
};

export const chainId = ChainId.Testnet;

export const MULTICALL_ADDRESS = '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576';

export const currency = {
  name: 'Binance',
  symbol: 'BNB',
  decimals: 18,
};

export const rpcUrls: Record<ChainId, string> = {
  [ChainId.Mainnet]: 'https://bsc-dataseed.binance.org',
  [ChainId.Testnet]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
};

export const chainData = {
  chainId: `0x${chainId.toString(16)}`,
  chainName: CHAIN_NAMES[chainId],
  nativeCurrency: currency,
  rpcUrls: [rpcUrls[chainId]],
  blockExplorerUrls: [EXPLORERS[chainId]],
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [chainId],
});

export const networkConnector = new NetworkConnector({
  urls: rpcUrls,
  defaultChainId: chainId,
});

export const networkLibrary = getLibrary(
  (networkConnector as any).providers[chainId]
);

export const ethereum = window.ethereum;

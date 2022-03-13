import { ethers } from 'ethers';

import MulticallAbi from '~/shared/abis/Multicall.json';

import { MULTICALL_ADDRESS, networkLibrary } from './config';

export type MulticallCall = {
  address: string;
  name: string;
  params: any[];
};

export async function multicall<T = any>(
  abi: any[],
  calls: MulticallCall[],
  provider: ethers.providers.Provider = networkLibrary
): Promise<T[]> {
  const multi = new ethers.Contract(MULTICALL_ADDRESS, MulticallAbi, provider);
  const itf = new ethers.utils.Interface(abi);
  const calldata = calls.map((call) => ({
    target: call.address,
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  const { returnData } = await multi.aggregate(calldata);
  const res = (returnData as any[]).map((call, i) =>
    itf.decodeFunctionResult(calls[i].name, call)
  );
  return res as any;
}

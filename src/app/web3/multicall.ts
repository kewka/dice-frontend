import { ethers } from 'ethers';

import { MULTICALL_ADDRESS, MULTICALL_ABI, networkLibrary } from './config';

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
  const multi = new ethers.Contract(MULTICALL_ADDRESS, MULTICALL_ABI, provider);
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

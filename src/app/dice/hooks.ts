import { useContract } from '../web3/hooks';

import { DICE_ABI, DICE_ADDRESS } from './config';

export function useDiceContract() {
  return useContract(DICE_ADDRESS, DICE_ABI);
}

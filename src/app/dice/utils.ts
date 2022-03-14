import { ethers } from 'ethers';

export function hasResult(result: number) {
  return result > 0;
}

export function isFinishedGame(results: number[]) {
  return hasResult(results[0]);
}

export function isPlayer(players: string[], address: string) {
  return players.some((item) => item === address);
}

export function getCursorIds(cursor: ethers.BigNumber) {
  const ids: ethers.BigNumber[] = [];
  for (let iterator = cursor; iterator.gt(0); iterator = iterator.sub(1)) {
    ids.push(iterator);
  }
  return ids;
}

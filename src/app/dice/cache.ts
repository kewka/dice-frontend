import { ethers } from 'ethers';
import { useMutation, useQuery } from 'react-query';

import * as api from './api';
import { useDiceContract } from './hooks';

export function useMinBet() {
  const contract = useDiceContract();
  return useQuery(['dice', 'minBet'], () => api.getMinBet(contract), {
    staleTime: Infinity,
  });
}

export function useMinPlayers() {
  const contract = useDiceContract();
  return useQuery(['dice', 'minPlayers'], () => api.getMinPlayers(contract), {
    staleTime: Infinity,
  });
}

export function useMaxPlayers() {
  const contract = useDiceContract();
  return useQuery(['dice', 'maxPlayers'], () => api.getMaxPlayers(contract), {
    staleTime: Infinity,
  });
}

export function useGameId() {
  const contract = useDiceContract();
  return useQuery(['dice', 'gameId'], () => api.getGameId(contract));
}

export function useGame(id: ethers.BigNumber) {
  const contract = useDiceContract();
  return useQuery(['dice', 'games', id.toString()], () =>
    api.fetchGame(contract, id)
  );
}

export function useCreateGame() {
  const contract = useDiceContract();
  return useMutation(
    (args: { amount: ethers.BigNumber; playerCount: number }) =>
      api.createGame(contract, args.amount, args.playerCount)
  );
}

export function useJoinGame() {
  const contract = useDiceContract();
  return useMutation((game: api.Game) => api.joinGame(contract, game));
}

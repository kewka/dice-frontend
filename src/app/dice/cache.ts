import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useQuery,
  useInfiniteQuery,
  UseQueryOptions,
  useMutation,
  QueryClient,
} from 'react-query';

import { ZeroBigNumber } from '../utils/bignumber';

import * as api from './api';
import { useDiceContract } from './hooks';
import { getCursorIds, isFinishedGame } from './utils';

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

export function useGameId(opts?: UseQueryOptions) {
  const contract = useDiceContract();
  return useQuery(
    ['dice', 'gameId'],
    () => api.getGameId(contract),
    opts as any
  );
}

export function useGame(id: ethers.BigNumber, opts?: UseQueryOptions) {
  const contract = useDiceContract();
  return useQuery(
    ['dice', 'games', id.toString()],
    () => api.fetchGame(contract, id),
    opts as any
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

export function useGamePayouts(game?: api.Game) {
  const contract = useDiceContract();
  return useQuery(
    ['dice', 'games', game?.id.toString(), 'payouts'],
    () =>
      api.calculatePayouts(
        contract,
        game!.results,
        game!.playerCount,
        game!.bet
      ),
    {
      enabled: game && isFinishedGame(game.results),
    }
  );
}

export function useCursor() {
  const { data: gameId } = useGameId();
  const [cursor, setCursor] = useState(gameId);
  const updateCursor = useCallback(() => setCursor(gameId), [gameId]);
  const updates = useMemo(
    () => (gameId && cursor ? gameId.sub(cursor) : ZeroBigNumber),
    [cursor, gameId]
  );

  useEffect(() => {
    if (!cursor && gameId) {
      updateCursor();
    }
  }, [cursor, gameId, updateCursor]);

  return {
    cursor,
    updateCursor,
    updates,
  };
}

export function useGamesList(cursor?: ethers.BigNumber, limit = 10) {
  const contract = useDiceContract();
  const cursorIds = useMemo(
    () => (cursor ? getCursorIds(cursor) : undefined),
    [cursor]
  );
  return useInfiniteQuery(
    ['dice', 'games', 'list', { cursor: cursor?.toString(), limit }],
    async ({ pageParam = 0 }) => {
      const ids = cursorIds!.slice(pageParam * limit, (pageParam + 1) * limit);
      return ids.length > 0 ? await api.fetchGames(contract, ids) : [];
    },
    {
      enabled: !!cursorIds,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === limit ? allPages.length : undefined,
    }
  );
}

export function updateGame(queryClient: QueryClient, game: api.Game) {
  queryClient.setQueryData(['dice', 'games', game.id.toString()], game);
  queryClient.setQueriesData(['dice', 'games', 'list'], (data: any) => {
    if (data) {
      for (let p = 0; p < data.pages.length; p++) {
        for (let g = 0; g < data.pages[p].length; g++) {
          const item: api.Game = data.pages[p][g];
          if (item.id.eq(game.id)) {
            data.pages[p][g] = game;
            break;
          }
        }
      }
    }

    return data;
  });
}

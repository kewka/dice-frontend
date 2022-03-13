import { ethers } from 'ethers';

import { transformRpcError } from '../utils/errors';
import { multicall, MulticallCall } from '../web3/multicall';

import { DICE_ABI } from './config';

// Errors
export const ErrBetAmountTooLow = new Error('Bet amount is too low');
export const ErrInvalidPlayerCount = new Error('Invalid Player Count');

// Structs
export type Game = {
  id: ethers.BigNumber;
  bet: ethers.BigNumber;
  playerCount: number;
  players: string[];
  results: number[];
};

// Events
export type GameCreated = {
  id: Game['id'];
};

export type GameFinished = {
  id: Game['id'];
  results: number[];
};

export type PlayerJoined = {
  id: Game['id'];
  player: string;
};

export function getMinBet(
  contract: ethers.Contract
): Promise<ethers.BigNumber> {
  return contract.MIN_BET();
}

export function getMinPlayers(contract: ethers.Contract): Promise<number> {
  return contract.MIN_PLAYERS();
}

export function getMaxPlayers(contract: ethers.Contract): Promise<number> {
  return contract.MAX_PLAYERS();
}

export async function createGame(
  contract: ethers.Contract,
  amount: ethers.BigNumber,
  playerCount: number
): Promise<GameCreated> {
  try {
    const tx: ethers.ContractTransaction = await contract.create(playerCount, {
      value: amount,
    });
    const receipt = await tx.wait();
    return { id: receipt.events![0].args!.id };
  } catch (err) {
    throw transformRpcError(err, [ErrBetAmountTooLow, ErrInvalidPlayerCount]);
  }
}

export function getGameId(
  contract: ethers.Contract
): Promise<ethers.BigNumber> {
  return contract.gameId();
}

export async function fetchGames(
  contract: ethers.Contract,
  ids: ethers.BigNumber[]
): Promise<Array<Game | null>> {
  const calls: MulticallCall[] = [];

  for (const id of ids) {
    calls.push(
      {
        name: 'games',
        address: contract.address,
        params: [id],
      },
      {
        name: 'players',
        address: contract.address,
        params: [id],
      },
      {
        name: 'results',
        address: contract.address,
        params: [id],
      }
    );
  }

  const res = await multicall(DICE_ABI, calls, contract.provider);
  const games: Array<Game | null> = [];

  for (let i = 0; i < res.length; i += 3) {
    games.push(
      res[i].playerCount > 0
        ? {
            id: calls[i].params[0],
            bet: res[i].bet,
            playerCount: res[i].playerCount,
            players: res[i + 1][0],
            results: res[i + 2][0],
          }
        : null // Game not found
    );
  }

  return games;
}

export async function fetchGame(
  contract: ethers.Contract,
  id: ethers.BigNumber
) {
  const [game] = await fetchGames(contract, [id]);
  return game;
}

export async function joinGame(contract: ethers.Contract, game: Game) {
  try {
    const tx: ethers.ContractTransaction = await contract.join(game.id, {
      value: game.bet,
    });
    await tx.wait();
  } catch (err) {
    throw transformRpcError(err, []);
  }
}

export type GameCreatedHandler = (event: GameCreated) => any;

export function onGameCreated(
  contract: ethers.Contract,
  handler: GameCreatedHandler
) {
  const filter = contract.filters.GameCreated();
  const listener: ethers.providers.Listener = (id: GameCreated['id']) =>
    handler({ id });

  contract.on(filter, listener);
  return () => {
    contract.off(filter, listener);
  };
}

export type GameFinishedHandler = (event: GameFinished) => any;

export function onGameFinished(
  contract: ethers.Contract,
  handler: GameFinishedHandler
) {
  const filter = contract.filters.GameFinished();
  const listener: ethers.providers.Listener = (
    id: GameFinished['id'],
    results: GameFinished['results']
  ) => handler({ id, results });

  contract.on(filter, listener);
  return () => {
    contract.off(filter, listener);
  };
}

export type PlayerJoinedHandler = (event: PlayerJoined) => any;

export function onPlayerJoined(
  contract: ethers.Contract,
  handler: PlayerJoinedHandler
) {
  const filter = contract.filters.PlayerJoined();
  const listener: ethers.providers.Listener = (
    id: PlayerJoined['id'],
    player: PlayerJoined['player']
  ) => handler({ id, player });
  contract.on(filter, listener);
  return () => {
    contract.off(filter, listener);
  };
}

export function calculatePayouts(
  contract: ethers.Contract,
  results: Game['results'],
  playerCount: Game['playerCount'],
  bet: Game['bet']
): Promise<ethers.BigNumber[]> {
  return contract.calculatePayouts(results, playerCount, bet);
}

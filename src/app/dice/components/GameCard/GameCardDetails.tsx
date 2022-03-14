import styled from '@emotion/styled';
import { ComponentProps, useMemo } from 'react';

import { List } from '~/ui/List';

import { Game } from '../../api';
import { useGamePayouts } from '../../cache';

import { GamePlayerItem } from './GamePlayerItem';

export type GameCardDetailsProps = ComponentProps<typeof Root> & {
  game: Game;
};

export function GameCardDetails({ game, ...rest }: GameCardDetailsProps) {
  const { data: payouts } = useGamePayouts(game);
  const players = useMemo(
    () => game.players.slice(0, game.playerCount),
    [game.playerCount, game.players]
  );
  return (
    <Root {...rest}>
      {players.map((player, i) => (
        <GamePlayerItem
          key={`${player}-${i}`}
          player={player}
          result={game.results[i]}
          payout={payouts?.[i]}
          bet={game.bet}
        />
      ))}
    </Root>
  );
}

export const Root = styled(List)`
  & > * + * {
    margin-top: 8px;
  }
`;

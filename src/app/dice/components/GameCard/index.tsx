import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import { useToggle } from 'react-use';

import { Card } from '~/ui/Card';
import { Divider } from '~/ui/Divider';

import { Game } from '../../api';

import { DetailsButton } from './DetailsButton';
import { GameCardDetails } from './GameCardDetails';
import { GameCardTable } from './GameCardTable';
import { JoinButton } from './JoinButton';

export type GameCardProps = ComponentProps<typeof Root> & {
  game: Game;
  initialDetails?: boolean;
};

export function GameCard({
  game,
  initialDetails = false,
  ...rest
}: GameCardProps) {
  const [details, toggleDetails] = useToggle(initialDetails);
  return (
    <Root {...rest}>
      <GameCardTable game={game} />
      <Divider />
      <Actions>
        <DetailsButton isOpen={details} onClick={toggleDetails} />
        <JoinButton game={game} />
      </Actions>
      {details && <StyledGameCardDetails game={game} />}
    </Root>
  );
}

export const Root = styled(Card)`
  display: flex;
  flex-direction: column;

  & > ${Divider} {
    margin: 8px 0;
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
`;

export const StyledGameCardDetails = styled(GameCardDetails)`
  margin-top: 8px;
`;

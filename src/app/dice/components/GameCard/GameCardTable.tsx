import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, NavLink } from 'react-router-dom';

import { Paths } from '~/app/router/paths';
import { formatAddress, formatCurrency } from '~/app/utils/format';
import { currency } from '~/app/web3/config';
import { isNotZeroAddress } from '~/app/web3/utils';
import { Avatar } from '~/ui/Avatar';
import { down, up } from '~/ui/mq';
import { TextLink } from '~/ui/TextLink';
import { Typography } from '~/ui/Typography';
import { sm } from '~/ui/vars/breakpoints';

import { Game } from '../../api';
import { isFinishedGame } from '../../utils';

export type GameCardTableProps = {
  game: Game;
};

export function GameCardTable({ game }: GameCardTableProps) {
  const { t } = useTranslation();
  return (
    <Root>
      {['#', t('Creator'), t('Bet'), t('Players'), t('Status')].map(
        (header, key) => (
          <HeaderCell key={key}>{header}</HeaderCell>
        )
      )}
      <IdCell id={game.id} />
      <CreatorCell address={game.players[0]} />
      <BetCell bet={game.bet} />
      <PlayersCell players={game.players} count={game.playerCount} />
      <StatusCell results={game.results} />
    </Root>
  );
}

export const Root = styled.div`
  display: grid;
  grid-template-columns: auto 0.4fr 0.4fr auto auto;
  gap: 4px;
  align-items: center;
  padding: 4px 0;

  @media ${up(sm)} {
    & > *:nth-child(5n) {
      text-align: right;
    }
  }

  @media ${down(sm)} {
    grid-template-columns: auto;
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;

    & > *:nth-child(n + 6) {
      text-align: right;
      justify-content: end;
    }
  }
`;

export function HeaderCell(props: ComponentProps<typeof Typography>) {
  return <Typography $variant="subtitle2" {...props} />;
}

export type BetCellProps = {
  bet: Game['bet'];
};

export function BetCell({ bet }: BetCellProps) {
  return <Typography>{formatCurrency(bet, currency.symbol)}</Typography>;
}

export type PlayersCellProps = {
  players: Game['players'];
  count: Game['playerCount'];
};

export function PlayersCell({ players, count }: PlayersCellProps) {
  const current = useMemo(
    () => players.filter(isNotZeroAddress).length,
    [players]
  );
  return (
    <Typography>
      {current}/{count}
    </Typography>
  );
}

export type StatusCellProps = {
  results: Game['results'];
};

export function StatusCell({ results }: StatusCellProps) {
  const { t } = useTranslation();
  const finished = isFinishedGame(results);
  return (
    <StatusCellRoot $finished={finished}>
      {finished ? t('Finished') : t('Pending')}
    </StatusCellRoot>
  );
}

export const StatusCellRoot = styled(Typography)<{ $finished?: boolean }>`
  color: var(--theme-info);

  ${(props) =>
    props.$finished &&
    css`
      color: var(--theme-success);
    `}
`;

export type IdCellProps = {
  id: Game['id'];
};

export function IdCell({ id }: IdCellProps) {
  return (
    <TextLink as={NavLink} to={generatePath(Paths.GAME, { id: id.toString() })}>
      {id.toString()}
    </TextLink>
  );
}

export type CreatorCellProps = {
  address: string;
};

export function CreatorCell({ address }: CreatorCellProps) {
  return (
    <CreatorCellRoot>
      <Avatar />
      <TextLink as={NavLink} to="#" title={address}>
        {formatAddress(address)}
      </TextLink>
    </CreatorCellRoot>
  );
}

export const CreatorCellRoot = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 8px;
  }
`;

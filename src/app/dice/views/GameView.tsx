import styled from '@emotion/styled';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';

import { getErrorMessage } from '~/app/utils/errors';
import { Alert } from '~/ui/Alert';
import { PageHeader } from '~/ui/PageHeader';
import { Skeleton } from '~/ui/Skeleton';

import { useGame } from '../cache';
import { GameCard } from '../components/GameCard';
import { GameCardSkeleton } from '../components/GameCard/GameCardSkeleton';

export type GameViewProps = {
  id: ethers.BigNumber;
};

export function GameView({ id }: GameViewProps) {
  const { t } = useTranslation();
  const { data, error } = useGame(id);

  if (data === null || error) {
    return (
      <Alert $severity="error">
        {error ? getErrorMessage(error) : t('Game not found')}
      </Alert>
    );
  }

  return (
    <Root>
      {data ? (
        <PageHeader title={t('Game #{{id}}', { id: data.id.toString() })} />
      ) : (
        <Skeleton height={64} />
      )}
      {data ? (
        <GameCard game={data} initialDetails />
      ) : (
        <GameCardSkeleton details />
      )}
    </Root>
  );
}

export const Root = styled.div`
  display: grid;
  gap: 8px;
`;

import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { Button } from '~/ui/Button';
import { InfiniteLoading } from '~/ui/InfiniteLoading';
import { List } from '~/ui/List';
import { ReactComponent as ArrowUpCircleIcon } from '~/ui/svg/ArrowUpCircleIcon.svg';

import { useCursor, useGamesList } from '../cache';

import { GameCard } from './GameCard';
import { GameCardSkeleton } from './GameCard/GameCardSkeleton';

export function GamesList() {
  const { t } = useTranslation();
  const { cursor, updateCursor, updates } = useCursor();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, remove } =
    useGamesList(cursor);
  const loading = !data || !cursor || isFetchingNextPage;

  return (
    <Root>
      {updates.gt(0) && (
        <UpdateCursorButton
          onClick={() => {
            remove();
            updateCursor();
          }}
        >
          <ArrowUpCircleIcon />
          {t('Load {{count}} new games', { count: updates.toNumber() })}
        </UpdateCursorButton>
      )}
      {data?.pages.map((page) =>
        page.map((game) => (
          <GameCard as="li" key={game!.id.toString()} game={game!} />
        ))
      )}
      <InfiniteLoading
        loading={loading}
        hasMore={hasNextPage}
        onMore={fetchNextPage}
        loader={[...Array(5)].map((_, key) => (
          <GameCardSkeleton as="li" key={key} />
        ))}
      />
    </Root>
  );
}

export const Root = styled(List)`
  & > li {
    margin-bottom: 24px;
  }
`;

export const UpdateCursorButton = styled(Button)`
  width: 100%;
  margin-bottom: 8px;
  justify-content: center;
`;

UpdateCursorButton.defaultProps = {
  variant: 'text',
};

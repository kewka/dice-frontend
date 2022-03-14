import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { GameView } from '~/app/dice/views/GameView';
import { isUintString } from '~/app/utils/validation';
import { NotFoundView } from '~/app/views/NotFoundView';

export default function GamePage() {
  const params = useParams<{ id: string }>();
  const id = useMemo(
    () =>
      isUintString(params.id!) ? ethers.BigNumber.from(params.id) : undefined,
    [params.id]
  );

  return id ? <GameView id={id} /> : <NotFoundView />;
}

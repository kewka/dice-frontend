import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '~/app/auth/provider';
import { useNotifications } from '~/app/notifications/provider';
import { getErrorMessage } from '~/app/utils/errors';
import { useAccountBalance } from '~/app/web3/cache';
import { Button, ButtonProps } from '~/ui/Button';

import { Game } from '../../api';
import { useJoinGame } from '../../cache';
import { isFinishedGame, isPlayer } from '../../utils';

export type JoinButtonProps = ButtonProps & {
  game: Game;
};

export function JoinButton({ game, ...rest }: JoinButtonProps) {
  const { t } = useTranslation();
  const { account } = useAuth();
  const { mutateAsync: joinGame, isLoading } = useJoinGame();
  const { notify } = useNotifications();

  const { data: balance } = useAccountBalance();

  const alreadyJoined = !!account && isPlayer(game.players, account);
  const insufficientBalance = balance ? balance.lt(game.bet) : true;

  let text = t('Join game');

  if (!account) {
    text = t('Connect your wallet');
  } else if (alreadyJoined) {
    text = t('Already joined');
  } else if (insufficientBalance) {
    text = t('Insufficient balance');
  }

  const onJoin = useCallback(async () => {
    try {
      await joinGame(game);
    } catch (err) {
      notify({ severity: 'error', content: getErrorMessage(err) });
    }
  }, [game, joinGame, notify]);

  if (isFinishedGame(game.results)) {
    return null;
  }

  return (
    <Button
      disabled={isLoading || insufficientBalance || !account || alreadyJoined}
      onClick={onJoin}
      size="small"
      variant="contained"
      {...rest}
    >
      {text}
    </Button>
  );
}

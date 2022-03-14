import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { generatePath, NavLink } from 'react-router-dom';

import { useAuth } from '~/app/auth/provider';
import { useNotifications } from '~/app/notifications/provider';
import { Paths } from '~/app/router/paths';
import { TextLink } from '~/ui/TextLink';

import {
  fetchGame,
  onGameCreated,
  onGameFinished,
  onPlayerJoined,
} from '../api';
import { updateGame, useGameId } from '../cache';
import { useDiceContract } from '../hooks';
import { isPlayer } from '../utils';

export function GamesSubscription() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const contract = useDiceContract();
  const { notify } = useNotifications();
  const { account } = useAuth();
  const { refetch: refetchGameId } = useGameId({
    enabled: false,
  });

  useEffect(
    () => onGameCreated(contract, (event) => refetchGameId()),
    [contract, refetchGameId]
  );

  useEffect(
    () =>
      onPlayerJoined(contract, async (event) =>
        updateGame(queryClient, (await fetchGame(contract, event.id))!)
      ),
    [contract, queryClient]
  );

  useEffect(
    () =>
      onGameFinished(contract, async (event) => {
        const game = (await fetchGame(contract, event.id))!;
        updateGame(queryClient, game);

        if (account && isPlayer(game.players, account)) {
          notify({
            severity: 'info',
            content: (
              <>
                {t('The game you joined has ended')}
                <br />
                <TextLink
                  $variant="caption"
                  as={NavLink}
                  to={generatePath(Paths.GAME, { id: game.id.toString() })}
                  style={{ color: 'inherit' }}
                >
                  {t('View #{{id}}', { id: game.id.toString() })}
                </TextLink>
              </>
            ),
          });
        }
      }),
    [account, contract, notify, queryClient, t]
  );

  return null;
}

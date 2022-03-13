import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { formatEther, parseEther } from 'ethers/lib/utils';
import styled from '@emotion/styled';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { Modal, ModalProps } from '~/ui/Modal';
import { Skeleton } from '~/ui/Skeleton';
import { Button } from '~/ui/Button';
import { FormField } from '~/ui/FormField';
import { Input } from '~/ui/Input';
import { getErrorMessage } from '~/app/utils/errors';
import { Alert } from '~/ui/Alert';
import { Paths } from '~/app/router/paths';
import { useAccountBalance } from '~/app/web3/cache';

import {
  useCreateGame,
  useMaxPlayers,
  useMinBet,
  useMinPlayers,
} from '../cache';
import { ErrBetAmountTooLow, ErrInvalidPlayerCount } from '../api';

import { BalanceField } from './BalanceField';

export type CreateGameModalProps = ModalProps;

export type CreateGameModalValues = {
  amount: string;
  playerCount: number;
};

export function CreateGameModal(props: CreateGameModalProps) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { data: minPlayers } = useMinPlayers();
  const { data: maxPlayers } = useMaxPlayers();
  const { data: minBet } = useMinBet();

  const [error, setError] = useState('');

  const { mutateAsync: createGame } = useCreateGame();
  const { refetch: refetchBalance } = useAccountBalance({
    enabled: false,
  });

  const formik = useFormik<CreateGameModalValues>({
    enableReinitialize: true,
    initialValues: {
      amount: minBet ? formatEther(minBet) : '',
      playerCount: minPlayers ?? 0,
    },
    onSubmit: async (values, { setErrors }) => {
      try {
        setError('');
        const created = await createGame({
          amount: parseEther(values.amount),
          playerCount: values.playerCount,
        });
        await refetchBalance();
        navigate(generatePath(Paths.GAME, { id: created.id.toString() }));
      } catch (err: any) {
        switch (err) {
          case ErrBetAmountTooLow:
            return setErrors({ amount: err.message });
          case ErrInvalidPlayerCount:
            return setErrors({ playerCount: err.message });
          default:
            return setError(getErrorMessage(err));
        }
      }
    },
  });

  const isLoaded =
    minPlayers !== undefined &&
    maxPlayers !== undefined &&
    minBet !== undefined;

  return (
    <Modal title={t('Create Game')} {...props}>
      {isLoaded ? (
        <form onSubmit={formik.handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          <Fields>
            <BalanceField
              label={t('Bet Amount')}
              error={formik.errors.amount}
              inputProps={{
                name: 'amount',
                placeholder: t('Enter the bet amount'),
                value: formik.values.amount,
                onChange: formik.handleChange,
                required: true,
                error: !!formik.errors.amount,
              }}
            />
            <FormField
              label={t('Players ({{min}}-{{max}})', {
                min: minPlayers.toString(),
                max: maxPlayers.toString(),
              })}
              error={formik.errors.playerCount}
            >
              <Input
                name="playerCount"
                step={1}
                type="number"
                placeholder={t('Enter the player count')}
                value={formik.values.playerCount}
                min={minPlayers}
                max={maxPlayers}
                onChange={formik.handleChange}
                error={!!formik.errors.playerCount}
                required
              />
            </FormField>
          </Fields>
          <Actions>
            <Button disabled={formik.isSubmitting} type="submit" variant="text">
              {t('Create')}
            </Button>
          </Actions>
        </form>
      ) : (
        <Skeleton height={200} />
      )}
    </Modal>
  );
}

export const Fields = styled.div`
  padding: 24px 0;
  display: grid;
  gap: 16px;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

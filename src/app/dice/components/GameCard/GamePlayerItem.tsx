import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useMedia } from 'react-use';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useAuth } from '~/app/auth/provider';
import { formatAddress, formatCurrency } from '~/app/utils/format';
import { isZeroAddress } from '~/app/web3/utils';
import { Avatar } from '~/ui/Avatar';
import { ListItem, ListItemText } from '~/ui/ListItem';
import { down } from '~/ui/mq';
import { TextLink } from '~/ui/TextLink';
import { Typography } from '~/ui/Typography';
import { sm } from '~/ui/vars/breakpoints';
import { ReactComponent as DiceUnknown } from '~/ui/svg/DiceUnknown.svg';
import { Dice } from '~/ui/Dice';
import { currency } from '~/app/web3/config';
import { Skeleton } from '~/ui/Skeleton';

import { hasResult } from '../../utils';

export type GamePlayerItemProps = {
  player: string;
  result: number;
  payout?: ethers.BigNumber;
  bet: ethers.BigNumber;
};

export function GamePlayerItem({
  player,
  result,
  payout,
  bet,
}: GamePlayerItemProps) {
  const { account } = useAuth();
  const { t } = useTranslation();
  const isDownSm = useMedia(down(sm));
  const isEmpty = isZeroAddress(player);
  const isFinished = hasResult(result);
  return (
    <ListItem>
      <Avatar />
      <ListItemText>
        {isEmpty ? (
          t('Empty')
        ) : (
          <span>
            <TextLink as={NavLink} to="#" title={player}>
              {isDownSm ? formatAddress(player) : player}
            </TextLink>
            {account === player && (
              <Typography as="span" $variant="caption">
                {` (${t('you')})`}
              </Typography>
            )}
          </span>
        )}
        {isFinished ? <PayoutText payout={payout} bet={bet} /> : null}
      </ListItemText>
      {isFinished ? <Dice $pips={result as any} /> : <DiceUnknown />}
    </ListItem>
  );
}

export type PayoutTextProps = {
  payout?: ethers.BigNumber;
  bet: ethers.BigNumber;
};

export function PayoutText({ payout, bet }: PayoutTextProps) {
  const { t } = useTranslation();
  const profitPercent = payout?.sub(bet).div(bet).mul(100);
  const isNegativeProfit = payout ? profitPercent?.lt(0) : undefined;

  if (!payout || !profitPercent) {
    return <Skeleton height={14} width={200} />;
  }

  return (
    <PayoutTextRoot $variant="caption" $isNegativeProfit={isNegativeProfit}>
      {t('Payout: {{value}} ({{profit}}%)', {
        value: formatCurrency(payout, currency.symbol),
        profit: `${!isNegativeProfit ? '+' : ''}${profitPercent.toString()}`,
      })}
    </PayoutTextRoot>
  );
}

export const PayoutTextRoot = styled(Typography)<{
  $isNegativeProfit?: boolean;
}>`
  color: var(--theme-color-success);

  ${(props) =>
    props.$isNegativeProfit &&
    css`
      color: var(--theme-color-error);
    `}
`;

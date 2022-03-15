import { useTranslation } from 'react-i18next';

import { useAuth } from '~/app/auth/provider';
import { formatAddress, formatCurrency } from '~/app/utils/format';
import { useAccountBalance } from '~/app/web3/cache';
import { currency } from '~/app/web3/config';
import { Avatar } from '~/ui/Avatar';
import { ListItem, ListItemText } from '~/ui/ListItem';
import { Skeleton } from '~/ui/Skeleton';
import { Typography } from '~/ui/Typography';
import { ReactComponent as LogoutIcon } from '~/ui/svg/LogoutIcon.svg';

export function AccountActions() {
  const { t } = useTranslation();

  const { disconnect, account } = useAuth();
  const { data: balance } = useAccountBalance();

  return (
    <>
      <ListItem>
        <Avatar />
        <ListItemText>
          <Typography>{formatAddress(account!)}</Typography>
          {balance ? (
            <Typography $variant="caption">
              {t('Balance: {{balance}}', {
                balance: formatCurrency(balance, currency.symbol),
              })}
            </Typography>
          ) : (
            <Skeleton height={14} />
          )}
        </ListItemText>
      </ListItem>
      <ListItem onClick={disconnect} as="button" type="button">
        <LogoutIcon />
        <ListItemText>{t('Disconnect')}</ListItemText>
      </ListItem>
    </>
  );
}

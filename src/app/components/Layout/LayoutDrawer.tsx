import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';
import { useMedia } from 'react-use';
import { useTranslation } from 'react-i18next';

import { Divider } from '~/ui/Divider';
import { Drawer } from '~/ui/Drawer';
import { List } from '~/ui/List';
import { ListItem, ListItemText } from '~/ui/ListItem';
import { Logo } from '~/ui/Logo';
import { down } from '~/ui/mq';
import { lg } from '~/ui/vars/breakpoints';
import { ReactComponent as PlayIcon } from '~/ui/svg/PlayIcon.svg';
import { ReactComponent as HelpIcon } from '~/ui/svg/HelpIcon.svg';
import { ReactComponent as GithubIcon } from '~/ui/svg/GithubIcon.svg';
import { ReactComponent as LoginIcon } from '~/ui/svg/LoginIcon.svg';
import { ReactComponent as LogoutIcon } from '~/ui/svg/LogoutIcon.svg';
import { useAuth } from '~/app/auth/provider';
import { Alert } from '~/ui/Alert';
import { Avatar } from '~/ui/Avatar';
import { useAccountBalance } from '~/app/web3/cache';
import { formatAddress, formatCurrency } from '~/app/utils/format';
import { currency } from '~/app/web3/config';
import { Typography } from '~/ui/Typography';
import { Skeleton } from '~/ui/Skeleton';
import { Paths } from '~/app/router/paths';

export type LayoutDrawerProps = ComponentProps<typeof Drawer>;

export function LayoutDrawer(props: LayoutDrawerProps) {
  const { t } = useTranslation();
  const isDownLg = useMedia(down(lg));
  const { account } = useAuth();
  return (
    <Drawer {...props}>
      {!isDownLg && <StyledLogo />}
      <StyledList as="nav">
        {account ? <AccountActions /> : <GuestActions />}
      </StyledList>
      <StyledDivider />
      <StyledList as="nav">
        <ListItem as={NavLink} to={Paths.INDEX}>
          <PlayIcon />
          <ListItemText>{t('Play')}</ListItemText>
        </ListItem>
        <ListItem as={NavLink} to={Paths.FAQ}>
          <HelpIcon />
          <ListItemText>{t('FAQ')}</ListItemText>
        </ListItem>
        <ListItem as="a" href="https://github.com/kewka/dice-app">
          <GithubIcon />
          <ListItemText>{t('GitHub')}</ListItemText>
        </ListItem>
      </StyledList>
    </Drawer>
  );
}

export const StyledLogo = styled(Logo)`
  display: flex;
  margin: 0 auto 16px;
`;

export const StyledList = styled(List)`
  display: grid;
  gap: 4px;
`;

export const StyledDivider = styled(Divider)`
  margin: 8px 0;
`;

export function GuestActions() {
  const { t } = useTranslation();
  const { connect, error } = useAuth();
  return (
    <>
      <ListItem onClick={connect} component="button" type="button">
        <LoginIcon />
        <ListItemText>{t('Connect')}</ListItemText>
      </ListItem>
      {error && <Alert severity="warning">{error.message}</Alert>}
    </>
  );
}

function AccountActions() {
  const { disconnect, account } = useAuth();
  const { data: balance } = useAccountBalance();
  const { t } = useTranslation();

  return (
    <>
      <ListItem as={NavLink} to={`/account/${account!}`}>
        <Avatar />
        <ListItemText>
          <Typography>{formatAddress(account!)}</Typography>
          {balance ? (
            <Typography variant="caption">
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

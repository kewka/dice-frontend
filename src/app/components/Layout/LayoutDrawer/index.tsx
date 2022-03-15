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
import { useAuth } from '~/app/auth/provider';
import { Paths } from '~/app/router/paths';

import { GuestActions } from './GuestActions';
import { AccountActions } from './AccountActions';
import { BottomActions } from './BottomActions';

export type LayoutDrawerProps = ComponentProps<typeof Root>;

export function LayoutDrawer(props: LayoutDrawerProps) {
  const { t } = useTranslation();
  const isDownLg = useMedia(down(lg));
  const { account } = useAuth();
  return (
    <Root {...props}>
      {!isDownLg && <StyledLogo />}
      <StyledList as="nav">
        {account ? <AccountActions /> : <GuestActions />}
      </StyledList>
      <StyledDivider />
      <StyledList as="nav">
        <ListItem data-close as={NavLink} to={Paths.INDEX}>
          <PlayIcon />
          <ListItemText>{t('Play')}</ListItemText>
        </ListItem>
        <ListItem data-close as={NavLink} to={Paths.FAQ}>
          <HelpIcon />
          <ListItemText>{t('FAQ')}</ListItemText>
        </ListItem>
      </StyledList>
      <BottomActions />
    </Root>
  );
}

export const Root = styled(Drawer)`
  display: flex;
  flex-direction: column;
`;

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

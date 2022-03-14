import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useMedia, useToggle } from 'react-use';

import { Container } from '~/ui/Container';
import { down } from '~/ui/mq';
import { Toolbar } from '~/ui/Toolbar';
import { lg } from '~/ui/vars/breakpoints';
import { width as drawerWidth } from '~/ui/vars/drawer';
import { height as toolbarHeight } from '~/ui/vars/toolbar';

import { LayoutDrawer } from './LayoutDrawer';
import { LayoutNotifications } from './LayoutNotifications';

export type LayoutProps = {
  children?: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [isOpen, toggleOpen] = useToggle(false);
  const isDownLg = useMedia(down(lg));
  return (
    <>
      <LayoutNotifications />
      <StyledLayoutDrawer />
      <Main $isOpen={isOpen}>
        <Container>{children}</Container>
      </Main>
      {isDownLg && <StyledToolbar onMenu={toggleOpen} />}
    </>
  );
}

export const Main = styled.main<{ $isOpen: boolean }>`
  margin-left: ${drawerWidth}px;
  background: var(--theme-background);
  min-height: 100vh;
  position: relative;
  transition: all 0.2s ease-in-out;

  & > ${Container} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  @media ${down(lg)} {
    width: 100%;
    margin-left: 0;
    margin-top: ${toolbarHeight}px;
    min-height: calc(100vh - ${toolbarHeight}px);

    ${(props) =>
      props.$isOpen &&
      css`
        margin-left: ${drawerWidth}px;
      `}
  }
`;

export const StyledToolbar = styled(Toolbar)`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
`;

export const StyledLayoutDrawer = styled(LayoutDrawer)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

  @media ${down(lg)} {
    top: ${toolbarHeight}px;
  }
`;

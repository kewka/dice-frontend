import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useMedia, useToggle } from 'react-use';

import { Container } from '~/ui/Container';
import { down } from '~/ui/mq';
import { Toolbar } from '~/ui/Toolbar';
import { cx } from '~/ui/utils';
import { lg } from '~/ui/vars/breakpoints';

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
      <Main>
        <Container>{children}</Container>
        {isOpen && isDownLg && <Overlay onClick={toggleOpen} />}
      </Main>
      <StyledLayoutDrawer className={cx(isOpen && 'open')} />
      {isDownLg && <StyledToolbar onMenu={toggleOpen} />}
    </>
  );
}

export const Main = styled.main`
  margin-left: var(--theme-drawer-width);
  min-height: 100vh;
  position: relative;

  & > ${Container} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  @media ${down(lg)} {
    width: 100%;
    margin-left: 0;
    margin-top: var(--theme-toolbar-height);
    min-height: calc(100vh - var(--theme-toolbar-height));
  }
`;

export const StyledToolbar = styled(Toolbar)`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
`;

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: var(--theme-color-overlay);
`;

export const StyledLayoutDrawer = styled(LayoutDrawer)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  transition: left var(--theme-transition-3) ease-in-out;

  @media ${down(lg)} {
    top: var(--theme-toolbar-height);
    left: calc(var(--theme-drawer-width) * -1);

    &.open {
      left: 0;
    }
  }
`;

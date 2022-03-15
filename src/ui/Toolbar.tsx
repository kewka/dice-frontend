import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { IconButton } from './IconButton';
import { Logo } from './Logo';
import { ReactComponent as MenuIcon } from './svg/MenuIcon.svg';

export type ToolbarProps = ComponentProps<typeof Root> & {
  onMenu?: () => any;
};

export function Toolbar({ onMenu, ...rest }: ToolbarProps) {
  return (
    <Root {...rest}>
      {onMenu && (
        <IconButton onClick={onMenu}>
          <MenuIcon />
        </IconButton>
      )}
      <Logo height="100%" />
    </Root>
  );
}

export const Root = styled.header`
  height: var(--theme-toolbar-height);
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background: var(--theme-color-background);
  box-shadow: 0px 2px 4px var(--theme-toolbar-shadow);
`;

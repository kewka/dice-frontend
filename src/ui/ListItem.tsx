import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { AnyProps } from '~/shared/types/AnyProps';

import { hover } from './mixins/hover';

export type ListItemProps = ComponentProps<typeof ListItem>;

export const ListItem = styled.li<AnyProps<'li'>>`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 8px;
  border-radius: 4px;
  width: 100%;

  & > * + * {
    margin-left: 16px;
  }

  &.active {
    color: var(--theme-primary);
  }

  button&,
  a& {
    ${hover}
  }
`;

export const ListItemText = styled.div`
  flex: 1;
  display: grid;
  gap: 5px;
`;

import styled from '@emotion/styled';

import { width } from './vars/drawer';

export const Drawer = styled.aside`
  padding: 16px 8px;
  width: ${width}px;
  background: var(--theme-background);
  border-right: 1px solid var(--theme-divider);
`;

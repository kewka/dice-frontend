import styled from '@emotion/styled';

import { typography, TypographyVariant } from './mixins/typography';

export const Typography = styled.div<{ $variant?: TypographyVariant }>`
  margin: 0;
  ${(props) => typography(props.$variant ?? 'body1')}
`;

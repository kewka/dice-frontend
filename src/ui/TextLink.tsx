import styled from '@emotion/styled';

import { AnyProps } from '~/types/AnyProps';

import { Typography } from './Typography';

export const TextLink = styled(Typography)<AnyProps<'a'>>`
  color: var(--theme-color-primary);
  text-decoration: underline;
`;

TextLink.defaultProps = {
  as: 'a',
};

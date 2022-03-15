import styled from '@emotion/styled';

import { AnyProps } from '~/types/AnyProps';

import { hover } from './mixins/hover';

export const IconButton = styled.button<AnyProps<'button'>>`
  border-radius: 50%;
  padding: 4px;
  ${hover}
`;

IconButton.defaultProps = {
  type: 'button',
};

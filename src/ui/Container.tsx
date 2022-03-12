import styled from '@emotion/styled';

import { down } from './mq';
import { lg } from './vars/breakpoints';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  width: 100%;

  @media ${down(lg)} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

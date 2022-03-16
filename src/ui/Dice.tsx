import { css } from '@emotion/react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import { ReactComponent as DiceSvg } from './svg/Dice.svg';

export const Dice = styled(DiceSvg, {
  shouldForwardProp: isPropValid,
})<{
  $pips: 1 | 2 | 3 | 4 | 5 | 6;
}>`
  circle {
    display: none;
  }

  ${(props) => {
    switch (props.$pips) {
      case 1:
        return css`
          circle {
            &:nth-of-type(5) {
              display: inherit;
            }
          }
        `;
      case 2:
        return css`
          circle {
            &:nth-of-type(1),
            &:nth-of-type(9) {
              display: inherit;
            }
          }
        `;
      case 3:
        return css`
          circle {
            &:nth-of-type(1),
            &:nth-of-type(5),
            &:nth-of-type(9) {
              display: inherit;
            }
          }
        `;
      case 4:
        return css`
          circle {
            &:nth-of-type(1),
            &:nth-of-type(3),
            &:nth-of-type(7),
            &:nth-of-type(9) {
              display: inherit;
            }
          }
        `;
      case 5:
        return css`
          circle {
            &:nth-of-type(1),
            &:nth-of-type(3),
            &:nth-of-type(5),
            &:nth-of-type(7),
            &:nth-of-type(9) {
              display: inherit;
            }
          }
        `;
      case 6:
        return css`
          circle {
            &:nth-of-type(1),
            &:nth-of-type(3),
            &:nth-of-type(4),
            &:nth-of-type(6),
            &:nth-of-type(7),
            &:nth-of-type(9) {
              display: inherit;
            }
          }
        `;
    }
  }}
`;

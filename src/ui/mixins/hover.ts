import { css } from '@emotion/react';

export const hover = css`
  transition: background-color var(--theme-transition-2) ease-in-out;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:not(:disabled):hover {
    background-color: var(--theme-color-hover);
  }

  &:not(:disabled):active {
    background-color: var(--theme-color-hover-active);
  }
`;

import { css } from '@emotion/react';
import { rem } from 'polished';

export const variants = {
  body1: css`
    font-size: ${rem(16)};
    line-height: ${rem(19)};
    font-weight: 400;
    letter-spacing: ${rem(0.5)};
  `,
  body2: css`
    font-size: ${rem(14)};
    line-height: ${rem(16)};
    font-weight: 400;
    letter-spacing: ${rem(0.5)};
  `,
  subtitle1: css`
    font-size: ${rem(16)};
    line-height: ${rem(19)};
    font-weight: 500;
    letter-spacing: ${rem(0.5)};
  `,
  subtitle2: css`
    font-size: ${rem(14)};
    line-height: ${rem(16)};
    font-weight: 500;
    letter-spacing: ${rem(0.5)};
  `,
  caption: css`
    font-size: ${rem(12)};
    line-height: ${rem(14)};
    font-weight: 400;
    letter-spacing: ${rem(0.5)};
    color: var(--theme-color-caption);
  `,
  button: css`
    font-size: ${rem(14)};
    line-height: ${rem(16)};
    font-weight: 500;
    letter-spacing: ${rem(1.25)};
    text-transform: uppercase;
  `,
  h1: css`
    font-size: ${rem(96)};
    line-height: ${rem(112)};
    font-weight: 300;
    letter-spacing: ${rem(-1.5)};
  `,
  h2: css`
    font-size: ${rem(60)};
    line-height: ${rem(70)};
    font-weight: 300;
    letter-spacing: ${rem(-0.5)};
  `,
  h3: css`
    font-size: ${rem(48)};
    line-height: ${rem(56)};
    font-weight: 400;
    letter-spacing: ${rem(0)};
  `,
  h4: css`
    font-size: ${rem(34)};
    line-height: ${rem(40)};
    font-weight: 400;
    letter-spacing: ${rem(0.25)};
  `,
  h5: css`
    font-size: ${rem(24)};
    line-height: ${rem(28)};
    font-weight: 400;
    letter-spacing: ${rem(0)};
  `,
  h6: css`
    font-size: ${rem(20)};
    line-height: ${rem(23)};
    font-weight: 500;
    letter-spacing: ${rem(0.15)};
  `,
};

export type TypographyVariant = keyof typeof variants;

export function typography(variant: TypographyVariant) {
  return css`
    font-family: Roboto, sans-serif;
    ${variants[variant]}
  `;
}

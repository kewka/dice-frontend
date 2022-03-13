import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { typography, TypographyVariant, variants } from './mixins/typography';
import { cx } from './utils';

export type TypographyProps = ComponentProps<typeof Root> & {
  variant?: TypographyVariant;
};

export function Typography({
  variant = 'body1',
  className,
  ...rest
}: TypographyProps) {
  return <Root className={cx(className, `variant-${variant}`)} {...rest} />;
}

export const Root = styled.div`
  margin: 0;

  ${Object.keys(variants).map(
    (variant) => css`
      &.variant-${variant} {
        ${typography(variant as TypographyVariant)}
      }
    `
  )}
`;

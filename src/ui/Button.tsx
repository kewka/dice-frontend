import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSProperties } from 'react';

import { AnyProps } from '~/shared/types/AnyProps';

import { typography } from './mixins/typography';
import { cx } from './utils';
import { white } from './vars/colors';

export type ButtonProps = AnyProps<typeof Root> & {
  style?: CSSProperties & {
    '--button-color'?: CSSProperties['color'];
    '--button-color-contrast'?: CSSProperties['color'];
  };
  color?: 'primary' | 'error' | 'warning' | 'info' | 'success' | 'caption';
  variant?: 'contained' | 'text' | 'outlined';
  size?: 'default' | 'small';
};

export function Button({
  className,
  color = 'primary',
  variant = 'contained',
  size = 'default',
  children,
  ...rest
}: ButtonProps) {
  return (
    <Root
      className={cx(
        className,
        `color-${color}`,
        `variant-${variant}`,
        `size-${size}`
      )}
      type="button"
      {...rest}
    >
      {children}
      <Ripple />
    </Root>
  );
}

export const Ripple = styled.span``;

export const Root = styled.button`
  /* Sizes */
  &.size-default {
    --button-height: 36px;
    --button-padding: 16px;
  }

  &.size-small {
    --button-height: 28px;
    --button-padding: 8px;
  }

  /* Colors */
  ${['primary', 'error', 'warning', 'info', 'success'].map(
    (color) => css`
      &.color-${color} {
        --button-color: var(--theme-${color});
        --button-color-contrast: var(--theme-${color}-contrast);
      }
    `
  )}

  &.color-caption {
    --button-color: var(--theme-text);
    --button-color-contrast: var(--theme-background);
    opacity: 0.6;
  }

  /* Variants */
  &.variant-contained {
    background: var(--button-color);
    color: var(--button-color-contrast);
  }

  &.variant-text {
    color: var(--button-color);
    --button-ripple-color: var(--button-color);
  }

  &.variant-outlined {
    --button-border-width: 1px;
    border: var(--button-border-width) solid var(--button-color);
    color: var(--button-color);
    transition: background 150ms ease-in-out;

    &:hover {
      background: var(--button-color);
      color: var(--button-color-contrast);
    }
  }

  /* General */
  ${typography('button')}
  --button-border-width: 0px;
  height: var(--button-height);
  padding: 0 calc(var(--button-padding) - var(--button-border-width));
  border-radius: 4px;
  white-space: nowrap;
  display: inline-grid;
  align-items: center;
  grid-auto-flow: column;
  position: relative;
  overflow: hidden;
  gap: 8px;

  /* Ripple */
  ${Ripple} {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: var(--button-ripple-color, ${white});
    opacity: 0;
    transition: opacity 150ms ease-in;
  }

  &:hover ${Ripple} {
    opacity: var(--button-ripple-hover-opacity, 0.1);
  }

  &:active ${Ripple} {
    opacity: var(--button-ripple-active-opacity, 0.25);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

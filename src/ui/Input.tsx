import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

import { typography } from './mixins/typography';
import { cx } from './utils';

export type InputProps = ComponentProps<'input'> & {
  error?: boolean;
  start?: ReactNode;
  end?: ReactNode;
};

export function Input({ error, start, end, className, ...rest }: InputProps) {
  return (
    <Root className={cx(className, error && 'error')}>
      {start && <Slot>{start}</Slot>}
      <input type="text" {...rest} />
      {end && <Slot>{end}</Slot>}
    </Root>
  );
}

export const Root = styled.div`
  height: 36px;
  border: 1px solid var(--theme-divider);
  border-radius: 4px;
  display: flex;
  transition: all 200ms ease-in-out;

  &.error {
    border-color: var(--theme-error);
  }

  input {
    ${typography('body2')}
    flex: 1;
    padding: 0 8px;
    background: none;
    border: none;
    color: var(--theme-text);
    outline: none;
  }
`;

export const Slot = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const numericInputProps = {
  inputMode: 'decimal',
  pattern: '^[0-9]*[.]?[0-9]*$',
  autoComplete: 'off',
  autoCorrect: 'off',
  spellCheck: false,
  onKeyPress: (event) => {
    if (!/[0-9.]/.test(event.key)) {
      event.preventDefault();
    }
  },
} as InputProps;

export const NumericInput = (props: InputProps) => (
  <Input {...numericInputProps} {...props} />
);

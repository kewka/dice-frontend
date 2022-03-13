import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

import { Typography } from './Typography';

export type FormFieldProps = ComponentProps<typeof Root> & {
  label?: ReactNode;
  error?: ReactNode;
};

export function FormField({ label, error, children, ...rest }: FormFieldProps) {
  return (
    <Root {...rest}>
      <LabelText>{label}</LabelText>
      {children}
      {error && <ErrorMessage variant="caption">{error}</ErrorMessage>}
    </Root>
  );
}

export const Root = styled.label`
  display: grid;
  gap: 4px;
`;

export const LabelText = styled(Typography)``;

LabelText.defaultProps = {
  variant: 'caption',
};

export const ErrorMessage = styled(Typography)`
  color: var(--theme-error);
  opacity: 1;
`;

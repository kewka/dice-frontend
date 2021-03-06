import { ComponentProps, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { IconButton } from './IconButton';
import { Typography } from './Typography';
import { ReactComponent as CloseIcon } from './svg/CloseIcon.svg';
import { ReactComponent as AlertCircleIcon } from './svg/AlertCircleIcon.svg';
import { ReactComponent as WarningIcon } from './svg/WarningIcon.svg';
import { ReactComponent as InfoCircleIcon } from './svg/InfoCircleIcon.svg';
import { ReactComponent as CheckCircleIcon } from './svg/CheckCircleIcon.svg';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

const icons: Record<AlertSeverity, ReactNode> = {
  error: <AlertCircleIcon />,
  warning: <WarningIcon />,
  info: <InfoCircleIcon />,
  success: <CheckCircleIcon />,
};

export type AlertProps = ComponentProps<typeof Root> & {
  onClose?: () => any;
};

export function Alert({ className, children, onClose, ...rest }: AlertProps) {
  return (
    <Root {...rest}>
      {icons[rest.$severity]}
      <Message>{children}</Message>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Root>
  );
}

export const Root = styled.div<{ $severity: AlertSeverity }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;

  ${(props) => css`
    background-color: var(--theme-color-${props.$severity});
    color: var(--theme-color-${props.$severity}-contrast);
  `}
`;

export const Message = styled(Typography)`
  flex: 1;
  margin: 0 0 0 12px;
  white-space: pre-wrap;
`;

Message.defaultProps = {
  $variant: 'body2',
};

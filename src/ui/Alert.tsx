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
import { cx } from './utils';

export const severities = ['error', 'warning', 'info', 'success'] as const;

export type AlertSeverity = typeof severities[number];

const icons: Record<AlertSeverity, ReactNode> = {
  error: <AlertCircleIcon />,
  warning: <WarningIcon />,
  info: <InfoCircleIcon />,
  success: <CheckCircleIcon />,
};

export type AlertProps = ComponentProps<typeof Root> & {
  severity: AlertSeverity;
  onClose?: () => any;
};

export function Alert({
  className,
  severity,
  children,
  onClose,
  ...rest
}: AlertProps) {
  return (
    <Root className={cx(className, `severity-${severity}`)} {...rest}>
      {icons[severity]}
      <Message>{children}</Message>
      {onClose && (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </Root>
  );
}

export const Root = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;

  ${severities.map(
    (severity) => css`
      &.severity-${severity} {
        background-color: var(--theme-${severity});
        color: var(--theme-${severity}-contrast);
      }
    `
  )}
`;

export const Message = styled(Typography)`
  flex: 1;
  margin: 0 0 0 12px;
  white-space: pre-wrap;
`;

Message.defaultProps = {
  variant: 'body2',
};

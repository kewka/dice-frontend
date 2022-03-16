import { ComponentProps, ReactNode } from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';

import { IconButton } from './IconButton';
import { Typography } from './Typography';
import { ReactComponent as CloseIcon } from './svg/CloseIcon.svg';

const appElement = document.querySelector<HTMLElement>('#root') || undefined;

const closeTimeoutMS = 300;

export type ModalProps = ComponentProps<typeof Root> & {
  title?: ReactNode;
};

export function Modal({ title, children, ...rest }: ModalProps) {
  return (
    <Root closeTimeoutMS={closeTimeoutMS} appElement={appElement} {...rest}>
      <Header>
        <Typography $variant="h6">{title}</Typography>
        <IconButton onClick={rest.onRequestClose}>
          <CloseIcon />
        </IconButton>
      </Header>
      {children}
    </Root>
  );
}

export const Root = styled(({ className, ...rest }: ReactModal.Props) => {
  return (
    <ReactModal
      closeTimeoutMS={300}
      appElement={appElement}
      bodyOpenClassName="ModalBodyOpen"
      portalClassName={className as string}
      overlayClassName="ModalOverlay"
      className="ModalContent"
      {...rest}
    />
  );
})`
  .ModalContent {
    background-color: var(--theme-color-background);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    max-width: 100%;
    padding: 16px;
    border-radius: 4px;
    outline: none;
  }

  .ModalOverlay {
    background-color: var(--theme-color-overlay);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: var(--theme-z-index-modal);
    transition: opacity ${closeTimeoutMS}ms ease-in-out;
    opacity: 0;

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }

    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

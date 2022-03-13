import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { Logo } from '~/ui/Logo';

export function PageLoader() {
  return (
    <Root>
      <StyledLogo />
    </Root>
  );
}

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  flex-direction: column;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

const pulse = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.25);
  }

  100% {
    opacity: 0.5;
    transform: scale(1);
  }
`;

export const StyledLogo = styled(Logo)`
  animation: ${pulse} 2s infinite ease-in-out;
`;

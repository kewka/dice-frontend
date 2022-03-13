import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps, CSSProperties } from 'react';

export type SkeletonProps = ComponentProps<typeof Root> & {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

export function Skeleton({
  width = '100%',
  height = 32,
  style,
  ...rest
}: SkeletonProps) {
  return <Root style={{ width, height, ...style }} {...rest} />;
}

const opacityPulse = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
`;

export const Root = styled.div`
  border-radius: 4px;
  background: var(--theme-skeleton-color);
  animation: ${opacityPulse} 2s infinite ease-in-out;
  max-width: 100%;
`;

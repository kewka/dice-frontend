import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import fallbackSrc from './svg/avatar-fallback.svg';

export type AvatarProps = ComponentProps<typeof Root>;

export function Avatar(props: AvatarProps) {
  return <Root {...props} src={props.src ?? fallbackSrc} />;
}

export const Root = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--theme-avatar-background);
`;

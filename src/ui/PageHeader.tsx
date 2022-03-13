import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

import { Typography } from './Typography';
import { down } from './mq';
import { sm } from './vars/breakpoints';

export type PageHeaderProps = ComponentProps<typeof Root> & {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({
  title,
  description,
  actions,
  ...rest
}: PageHeaderProps) {
  return (
    <Root {...rest}>
      <Texts>
        <Typography as="h3" variant="h3">
          {title}
        </Typography>
        <Typography variant="caption">{description}</Typography>
      </Texts>
      <Actions>{actions}</Actions>
    </Root>
  );
}

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${down(sm)} {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
`;

export const Texts = styled.div`
  display: grid;
  gap: 8px;

  @media ${down(sm)} {
    margin-bottom: 8px;
  }
`;

export const Actions = styled.div`
  display: grid;
  justify-content: end;
  grid-auto-flow: column;
`;

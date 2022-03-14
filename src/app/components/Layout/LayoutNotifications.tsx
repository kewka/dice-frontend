import styled from '@emotion/styled';
import { ComponentProps } from 'react';
import { Transition, animated } from 'react-spring';

import { useNotifications } from '~/app/notifications/provider';
import { Alert } from '~/ui/Alert';
import { down } from '~/ui/mq';
import { lg } from '~/ui/vars/breakpoints';
import { height as toolbarHeight } from '~/ui/vars/toolbar';

export type LayoutNotificationsProps = ComponentProps<typeof Root>;

export function LayoutNotifications(props: LayoutNotificationsProps) {
  const { notifications, close } = useNotifications();
  return (
    <Root {...props}>
      <Transition
        items={notifications}
        from={{
          opacity: 0,
          right: -200,
        }}
        enter={{
          opacity: 1,
          right: 0,
        }}
        leave={{
          opacity: 0,
          right: -200,
        }}
      >
        {(style, item) => (
          <animated.div style={style} key={item.id}>
            <Alert $severity={item.severity} onClose={() => close(item.id)}>
              {item.content}
            </Alert>
          </animated.div>
        )}
      </Transition>
    </Root>
  );
}

export const Root = styled.div`
  position: fixed;
  right: 16px;
  top: 16px;
  z-index: var(--theme-notifications-z-index);

  display: grid;
  gap: 8px;
  width: 320px;
  max-width: 100%;

  & > * {
    position: relative;
  }

  @media ${down(lg)} {
    top: ${toolbarHeight + 16}px;
  }
`;

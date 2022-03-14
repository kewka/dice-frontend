import { useCallback, useRef, useState } from 'react';
import { createContainer } from 'unstated-next';
import { nanoid } from 'nanoid';

import { AlertProps } from '~/ui/Alert';

export type NotificationType = {
  id: string;
  severity: AlertProps['$severity'];
  content: AlertProps['children'];
  timeout: number;
};

const Notifications = createContainer(() => {
  const timeoutsRef = useRef<Partial<Record<string, NodeJS.Timeout>>>({});
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const clearNotificationTimeout = useCallback((id: NotificationType['id']) => {
    const timeout = timeoutsRef.current[id];
    if (timeout !== undefined) {
      clearTimeout(timeout);
      delete timeoutsRef.current[id];
    }
  }, []);
  const close = useCallback(
    (id: NotificationType['id']) => {
      clearNotificationTimeout(id);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    },
    [clearNotificationTimeout]
  );
  const setupNotificationTimeout = useCallback(
    (notification: NotificationType) => {
      timeoutsRef.current[notification.id] = setTimeout(
        () => close(notification.id),
        notification.timeout
      );
    },
    [close]
  );
  const notify = useCallback(
    ({
      severity = 'info',
      timeout = 5000,
      content,
    }: Partial<Omit<NotificationType, 'id'>>) => {
      const notification: NotificationType = {
        id: nanoid(),
        severity,
        content,
        timeout,
      };
      setNotifications((prev) => [...prev, notification]);
      setupNotificationTimeout(notification);
    },
    [setupNotificationTimeout]
  );

  return { notify, close, notifications };
});

export const useNotifications = Notifications.useContainer;
export const NotificationsProvider = Notifications.Provider;

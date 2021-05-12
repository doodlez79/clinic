import { NotificationContentType } from 'ducks/Notifications/Notifications.types';

export interface NotificationContentProps {
  notifications: NotificationContentType[];
  setElemIdOnScroll: (value: string[]) => void;
  onRefresh: () => void
  loading: boolean
}

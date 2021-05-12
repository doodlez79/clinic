import { NotificationContent } from 'expo-notifications';

export interface NotificationStateType {
  loading: boolean;
  error: any;
  experienceId: string,
  id: string;
  device: TYPE_DEVICE;
  notifications: NotificationContentType[];
}

export interface NotificationType {
  content: NotificationContent;
  identifier: string;
  newNotification: boolean;
  date: number;
}

export enum TYPE_NOTIFICATION {
  PROMOTION = 'PROMOTION',
  BROADCAST = 'BROADCAST',
  TEST_IS_READY = 'TEST_IS_READY',
  PRIVATE_MESSAGE = 'PRIVATE_MESSAGE',
  POST = 'POST',
  BONUS = 'BONUS'
}

export interface NotificationContentType {
  id: string,
  notification: {
    id: string;
    title: string;
    body: string;
    entityId: string;
    type: TYPE_NOTIFICATION;
    createdAt: Date;
    updatedAt: Date;
  },
  isNewNotification: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum TYPE_DEVICE {
  IOS= 'IOS',
  ANDROIN = 'ANDROID'
}

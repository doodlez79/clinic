import { ApiServices } from 'services/Api';
import { NotificationContentType } from 'ducks/Notifications/Notifications.types';
import { parseISO } from 'date-fns';

export default class NotificationsServices {
  APIService: ApiServices;

  constructor(APIService: ApiServices) {
    this.APIService = APIService;
  }

  sendId(id: string, device: string, experienceId: string) {
    return this.APIService.post('/push', { token: id, platform: device, experienceId });
  }

  getList() {
    return this.APIService.get('/push/list').then(res => this.mapEntities(res));
  }

  readrNotification(id:string) {
    return this.APIService.patch(`/push/${id}`);
  }

  mapEntity(notification: Omit<NotificationContentType, 'createdAt'> & {createdAt: string | null}) {
    return {
      ...notification,
      createdAt: notification.createdAt ? parseISO(notification.createdAt) : null,

    };
  }

  mapEntities(notifications: Array< Omit<NotificationContentType, 'createdAt'>&{createdAt: string | null}>) {
    return notifications.map(this.mapEntity);
  }
}

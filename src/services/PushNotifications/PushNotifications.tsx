import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const unsupportedPushTokenInformation = {
  token: null,
  platform: 'unknown',
  experienceId: Constants.manifest.id,
};

class PushNotifications {
  getPermissionNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    return status;
  }

  requestPermission = async () => {
    const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    return newStatus;
  }

  getDevicePushTokenInformation = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [ 0, 250, 250, 250 ],
        lightColor: '#FF231F7C',
      });
    }

    if (Constants.isDevice) {
      let status = await this.getPermissionNotifications();

      if (status !== 'granted') {
        const newStatus = await this.requestPermission();

        status = newStatus;
      }

      if (status === 'granted') {
        try {
          const { data: token } = await Notifications.getExpoPushTokenAsync();

          return {
            token,
            platform: Platform.OS.toLocaleUpperCase(),
            experienceId: Constants.manifest.id,
          };
        } catch (e) {
          return unsupportedPushTokenInformation;
        }
      } else {
        return unsupportedPushTokenInformation;
      }
    } else {
      return undefined;
    }
  }
}

export default PushNotifications;

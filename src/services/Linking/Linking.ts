import { Linking } from 'react-native';

class LinkingService {
  callPhone = async (phone:string) => Linking.openURL(`tel:${phone}`)

  sendEmail = async (email: string) => Linking.openURL(`mailto:${email}`)

  openSetting = async () => Linking.openURL('app-settings:')

  openURL = async (url: string) => Linking.openURL(url)
}
export default LinkingService;

import { LatLng } from 'types/lat-lng';

export const AppNavigationConfig = [
  {
    id: '2gis',
    name: '2ГИС',
    originUrl: 'dgis://',
    disable: true,
    resolveIcon: () => require('../../assets/app-icons/2gis.png'),
    createUrl: (coords: LatLng) => `dgis://2gis.ru/routeSearch/rsType/car/to/${coords.lng},${coords.lat}`,
  },
  {
    id: 'YandexMap',
    name: 'Яндекс.Карты',
    originUrl: 'yandexmaps://',
    disable: true,
    resolveIcon: () => require('../../assets/app-icons/yandex-maps.png'),
    createUrl: (coords: LatLng) => `yandexmaps://maps.yandex.ru/?rtext=${coords.lat},${coords.lng}&rtt=auto`,
  },
  {
    id: 'YandexNavi',
    name: 'Яндекс.Навигатор',
    originUrl: 'yandexnavi://',
    disable: true,
    resolveIcon: () => require('../../assets/app-icons/yandex-navi.png'),
    createUrl: (coords: LatLng) => `yandexnavi://build_route_on_map?lat_to=${coords.lat}&lon_to=${coords.lng}`,
  },
  {
    id: 'GoogleMap',
    name: 'Google Карты',
    originUrl: 'comgooglemaps://',
    disable: true,
    resolveIcon: () => require('../../assets/app-icons/google-maps.png'),
    createUrl: (coords: LatLng) => `comgooglemaps://?daddr=${coords.lat},${coords.lng}&directionsmode=driving`,
  },
];

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { isPointWithinRadius } from 'geolib';
import { City } from 'ducks/Misc/Misc.types';

class LocationServices {
  getPermissionLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    return status;
  }

  getCurrentLocation = async () => {
    const locationCurrent = await Location.getCurrentPositionAsync({});
    return locationCurrent;
  }

  hasPermissionLocation = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    return status;
  }

  getCurrentCityByCoords = async (cities: City[]) => {
    try {
      const status = await this.hasPermissionLocation();
      if (status !== 'granted') {
        return null;
      }

      const { coords: { latitude, longitude } } = await this.getCurrentLocation();
      const city = cities.find(el => {
        const { lat, lng } = el.center!;
        if (el.radius) {
          return isPointWithinRadius(
            { latitude, longitude },
            { latitude: lat, longitude: lng },
            el.radius * 1000,
          );
        }
        return false;
      });

      return city;
    } catch (e) {
      // eslint-disable-next-line no-console
      return console.log(e);
    }
  }
}
export default LocationServices;

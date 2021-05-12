import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

import NonActiveMarker from 'Icons/NonActiveMarker.svg';
import MenuMap from 'Icons/MenuMap.svg';
import Back from 'Icons/Back.svg';
import Plus from 'Icons/Plus.svg';
import Minus from 'Icons/Minus.svg';
import Pointer from 'Icons/Pointer.svg';
import { ModalComponent } from 'components/Modal';
import { POSITION_TYPE } from 'components/Modal/Modal.types';
import { Actions, Selectors } from 'ducks';
import { MapMarkerItem } from 'components/MapMarkerItem';
import { colors } from 'constants/colors';
import { City, Clinic } from 'ducks/Misc/Misc.types';
import { ContentMapModal } from 'components/ContentMapModal';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';

import { IconResize } from 'components/IconResize';
import { GeoLocationService, LinkingURLService } from 'services';
import { useFocusEffect } from '@react-navigation/native';
import { AppNavigationConfig } from 'constants/configAppNavigation';
import { RECORD_TYPE } from 'navigation/Navigation.types';
import { MapScreenProps } from './Map.types';
import { defaultDelta } from './Map.config';
import { styles } from './styles';

const MapScreen: FC<MapScreenProps> = ({ navigation }) => {
  const clinics = useSelector(Selectors.Misc.getClinics);
  const authParam = useSelector(Selectors.Auth.isAuthorized);
  const cities = useSelector(Selectors.Misc.getCities);
  const profile = useSelector(Selectors.User.isProfile);
  const locationUser = useSelector(Selectors.Misc.getLocation);
  const [ modalList, setModalList ] = useState(false);
  const [ selectedCity, setSelectedCity ] = useState<City | null>(profile.city);
  const [ location, setLocation ] = useState<LocationObject | null>(locationUser);
  const [ locationDelta, setLocationDelta ] = useState(defaultDelta);
  const [ currentRegion, setCurrentRegion ] = useState<Region | null>(null);

  const dispatch = useDispatch();

  let clinicsByCity: Clinic[] = [];

  if (profile.city) {
    clinicsByCity = clinics.filter(el => el.city && el.city.id === profile.city!.id);
  }

  const [ modal, setModal ] = useState({
    visible: false,
    id: '',
  });

  const getCurrentLocationUser = async () => {
    const locationObj = await GeoLocationService.getCurrentLocation();
    const {
      coords: { longitude, latitude },
    } = locationObj;

    if (
      locationUser?.coords.latitude !== latitude
      || locationUser?.coords.longitude !== longitude
    ) {
      return dispatch(Actions.Misc.setLocations(locationObj));
    }
    return null;
  };

  const setLocationCity = (center: City['center']) => {
    if (center) {
      const locationCityObj:LocationObject = {
        timestamp: 0,
        coords: {
          latitude: center.lat,
          longitude: center.lng,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
      };
      setLocation(locationCityObj);
    }
  };

  useFocusEffect(useCallback(() => {
    let waitChangeLocation: { remove: any; };
    // eslint-disable-next-line consistent-return
    (async () => {
      try {
        const status = await GeoLocationService.hasPermissionLocation();
        if (status === 'granted') {
          if (profile.city) {
            const centerCityProfile = cities.find(el => el.id === profile.city!.id)!.center;

            if (centerCityProfile) {
              setLocationCity(centerCityProfile);
            }
          } else {
            setModalList(true);
          }
          await getCurrentLocationUser();
          waitChangeLocation = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          }, loc => {
            const { coords: { latitude, longitude } } = loc;
            if (latitude.toFixed(4) !== locationUser?.coords.latitude.toFixed(4)
              && longitude.toFixed(4) !== locationUser?.coords.longitude.toFixed(4)) {
              dispatch(Actions.Misc.setLocations(loc));
            }
          });
        } else {
          const status = await GeoLocationService.getPermissionLocation();
          if (status !== 'granted') {
            setModalList(true);
            if (profile.city) {
              const centerCityProfile = cities.find(el => el.id === profile.city!.id)!.center;
              if (centerCityProfile) {
                setLocationCity(centerCityProfile);
              }
            }
            // eslint-disable-next-line no-console
            return console.log('Permission to access location was denied');
          }

          await getCurrentLocationUser();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    })();
    return () => {
      if (waitChangeLocation && waitChangeLocation.remove) {
        waitChangeLocation.remove();
      }
    };
  }, [ profile.city?.id ]));

  let refMap: MapView | null;

  const onPressZoomInOut = (type: string) => {
    let region = {
      ...defaultDelta,
      latitude: currentRegion ? currentRegion.latitude : location?.coords.latitude,
      longitude: currentRegion ? currentRegion.longitude : location?.coords.longitude,
    };

    if (type === 'ZoomIn') {
      region = {
        ...region,
        latitudeDelta: locationDelta.latitudeDelta / 2,
        longitudeDelta: locationDelta.longitudeDelta / 2,
      };
    } else {
      region = {
        ...region,
        latitudeDelta: locationDelta.latitudeDelta * 2,
        longitudeDelta: locationDelta.longitudeDelta * 2,
      };
    }
    setLocationDelta({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });

    if (refMap && region.latitude && region.longitude) {
      refMap.animateToRegion(region as Region, 400);
    }
  };

  const getCurrentLocation = () => {
    const region = {
      ...defaultDelta,
      latitude: locationUser?.coords.latitude,
      longitude: locationUser?.coords.longitude,
    };
    setLocationDelta({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
    if (refMap && region.latitude && region.longitude) {
      refMap.animateToRegion(region as Region, 400);
    }
  };

  const selectedCityHandler = async (id: string) => {
    try {
      const currentCityCenter = cities.find(el => el.id === id)!;

      if (currentCityCenter) {
        setSelectedCity(currentCityCenter);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const moveCameraToLocation = (
    x: number,
    y: number,
    id?: string,
    duration = 400,
  ) => {
    const latitude = x;
    const longitude = y;
    if (refMap) {
      setLocation(s => ({
        timestamp: s!.timestamp,
        coords: {
          ...s!.coords,
          latitude,
          longitude,
        },
      }));

      refMap.animateCamera(
        {
          center: {
            latitude: latitude - (id ? 0.003 : 0),
            longitude,
          },
          zoom: 16,
        },
        {
          duration,
        },
      );
    }
    if (id) {
      setTimeout(() => setModal({ visible: true, id }), duration);
    }
  };

  useEffect(() => {
    (async () => {
      const currentCityByLocation = await GeoLocationService.getCurrentCityByCoords(cities);

      if (selectedCity && currentCityByLocation && location?.coords.latitude && location?.coords.longitude) {
        moveCameraToLocation(selectedCity?.center!.lat, selectedCity?.center!.lng);
      }
    })();
  }, [ selectedCity, cities ]);

  // useEffect(() => {
  //   if (locationUser?.coords.longitude && locationUser?.coords.latitude && !modal.visible) {
  //     moveCameraToLocation(locationUser?.coords.latitude, locationUser?.coords.longitude);
  //   }
  // }, [ locationUser?.coords.longitude, locationUser?.coords.latitude ]);

  const onChangeRegion = (region: Region) => {
    setCurrentRegion(region);
  };
  const drivePathToClinic = async (nameApp: string, id:string) => {
    const coordsClinic = clinics.find(el => el.id === id)!.coords;
    const urlApp = AppNavigationConfig.find(el => el.id === nameApp)!.createUrl;

    if (coordsClinic) {
      await LinkingURLService.openURL(urlApp(coordsClinic));
    }
  };
  return (
    <>
      <View style={ styles.container }>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            top: 40,
            left: 5,
            width: Dimensions.get('window').width - 20,
            zIndex: 99999,
          }}
        >
          <TouchableOpacity onPress={ () => navigation.goBack() }>
            <IconResize size={ 52 }>
              <Back />
            </IconResize>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => setModalList(true) }>
            <IconResize size={ 52 }>
              <MenuMap />
            </IconResize>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            justifyContent: 'space-between',
            top: Dimensions.get('window').height / 2.9,
            right: 20,
            height: 200,
            zIndex: 99999,
          }}
        >
          <TouchableOpacity onPress={ () => onPressZoomInOut('ZoomIn') }>
            <IconResize size={ 52 }>
              <Plus />
            </IconResize>

          </TouchableOpacity>
          <TouchableOpacity onPress={ () => onPressZoomInOut('ZoomOut') }>
            <IconResize size={ 52 }>
              <Minus />
            </IconResize>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => getCurrentLocation() }>
            <IconResize size={ 52 }>
              <Pointer />
            </IconResize>
          </TouchableOpacity>
        </View>

        {location && location.coords && (
          <MapView
            onRegionChangeComplete={ onChangeRegion }
            ref={ ref => (refMap = ref) }
            provider={ PROVIDER_GOOGLE }
            style={ styles.mapStyle }
            followsUserLocation
            showsUserLocation
            zoomEnabled
            initialRegion={{
              latitude: locationUser ? locationUser.coords.latitude : location.coords.latitude,
              longitude: locationUser ? locationUser.coords.longitude : location.coords.longitude,
              latitudeDelta: locationDelta.latitudeDelta,
              longitudeDelta: locationDelta.longitudeDelta,
            }}
          >
            {clinics.map(item => (
              <Marker
                key={ item.id }
                onPress={ () => {
                  moveCameraToLocation(
                    item.coords.lat,
                    item.coords.lng,
                    item.id,
                  );
                } }
                coordinate={{
                  latitude: item.coords.lat,
                  longitude: item.coords.lng,
                }}
              >
                <NonActiveMarker
                  strokeProps={ item.id === modal.id ? colors.green : 'white' }
                  fill={ item.id === modal.id ? 'white' : colors.green }
                />
              </Marker>
            ))}
          </MapView>
        )}
      </View>
      <ModalComponent
        width="100%"
        backdropColor="transparent"
        modalVisible={ modalList }
        setModalVisible={ () => setModalList(false) }
        position={ POSITION_TYPE.END }
      >
        <ContentMapModal
          currentStep={ clinicsByCity.length === 0 ? 2 : 1 }
          city={ selectedCity || profile.city }
          cityOptionsPlace={ bySelectedType(cities) }
          clinicsByCity={ clinicsByCity }
          clinics={ clinics }
          moveCameraToLocation={ moveCameraToLocation }
          setModalList={ () => setModalList(false) }
          cities={ cities }
          selectedHandlerCity={ selectedCityHandler }
        />
      </ModalComponent>
      <ModalComponent
        backdropColor="transparent"
        modalVisible={ modal.visible }
        setModalVisible={ () => setModal({
          visible: false,
          id: '',
        }) }
        position={ POSITION_TYPE.END }
      >
        <MapMarkerItem
          auth={ authParam }
          id={ modal.id }
          drivePathHandler={ nameApp => drivePathToClinic(nameApp, modal.id) }
          onPress={ () => {
            setModal({
              visible: false,
              id: '',
            });
            navigation.replace('Record', { clinicId: modal.id, type: RECORD_TYPE.CLINIC });
          } }
        />
      </ModalComponent>
    </>
  );
};

export default MapScreen;

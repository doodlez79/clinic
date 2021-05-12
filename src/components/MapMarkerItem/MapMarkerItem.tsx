import React from 'react';

import {
  Linking,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import Clipboard from 'expo-clipboard';

import { useSelector } from 'react-redux';

import * as Animatable from 'react-native-animatable';

import { Container } from 'components/Container';
import { Typography } from 'components/Typography';
import { Btn } from 'components/Btn';
import { LinkText } from 'components/LinkText';

import { AppNavigationConfig } from 'constants/configAppNavigation';
import { colors } from 'constants/colors';

import { Selectors } from 'ducks';

import { perfectSize } from 'helpers/perfectSize';

import ListTwo from 'Icons/ListTwo.svg';

import { MapMarkerItemProps } from './MapMarkerItem.types';

const MapMarkerItem: React.FC<MapMarkerItemProps> = ({
  onPress, id, auth, drivePathHandler,
}) => {
  const clinics = useSelector(Selectors.Misc.getClinics);
  const cities = useSelector(Selectors.Misc.getCities);

  const [ stepModal, setStepModal ] = React.useState(0);
  const [ mapAppState, setMapAppState ] = React.useState(AppNavigationConfig);
  const [ save, setSave ] = React.useState(false);

  let refView: any;

  React.useEffect(() => {
    (async () => {
      const requestAll = mapAppState.map(el => Linking.canOpenURL(el.originUrl));

      Promise.all(requestAll).then(canBeOpened => mapAppState.map((el, index) => ({
        ...el,
        disable: !canBeOpened[index],
      }))).then(newMapAppState => {
        setMapAppState(newMapAppState);
      }).catch(() => {});
    })();
  }, []);

  const currentClinic = clinics.find(el => el.id === id);
  const city = currentClinic ? cities.find(el => currentClinic.city && el.id === currentClinic.city.id) : null;

  const handlerCreateDrivePath = async (nameApp: string) => {
    drivePathHandler(nameApp);
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    setSave(true);
    setTimeout(() => setSave(false), 2000);
  };

  const fadeInRight = (step: number) => {
    setStepModal(step);
    refView.fadeInRightBig(400).then((endState: { finished: boolean; }) => (endState.finished ? '' : ''));
  };

  const renderMapItemContent = () => {
    if (stepModal === 0) {
      return (
        <Animatable.View ref={ ref => refView = ref }>
          {currentClinic && currentClinic.address && (
            <Typography
              regular
              text={ currentClinic.address }
              align="left"
              color="#333333"
              mb={ 15 }
            />
          )}
          {
            currentClinic && Boolean(currentClinic.workingHours) && (
              <>
                <Typography
                  regular
                  text="Режим работы"
                  align="left"
                  color="#999"
                />

                <Typography
                  regular
                  text={ currentClinic.workingHours }
                  align="left"
                  color="#999"
                  mb={ 15 }
                />
              </>
            )
          }

          {currentClinic?.phones.map(item => (
            <Typography key={ item.id } align="left" mb={ 15 }>
              <Typography regular text="Тел: " align="left" color="#999" />
              <LinkText
                fontSize={ 15 }
                text={ item.phone }
                onClick={ () => Linking.openURL(`tel:${item.phone}`) }
              />
            </Typography>
          ))}
          {currentClinic && currentClinic.address && (
            <Typography align="left" mb={ 25 }>
              <Typography regular text="Эл. почта: " align="left" color="#999" />
              <LinkText
                fontSize={ 15 }
                text={ currentClinic.email }
                onClick={ () => Linking.openURL(`mailto:${currentClinic.email}`) }
              />
            </Typography>
          )}

          {
            auth && (
              <Btn Title="Записаться" onClick={ onPress } />

            )
          }
        </Animatable.View>
      );
    }
    if (stepModal === 1) {
      return (
        <Animatable.View ref={ ref => refView = ref }>

          <TouchableOpacity
            onPress={ () => copyToClipboard(currentClinic ? currentClinic.address : '') }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: perfectSize(10),
            }}
          >
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
            >
              <View style={{
                width: perfectSize(32),
                height: perfectSize(32),
              }}
              >
                <ListTwo />
              </View>

              <Typography
                ml={ 10 }
                fontSize={ 15 }
                regular
                text="Скопировать адрес клиники"
                align="left"
                color="#333333"
              />
            </View>

            {
              save && (
              <Typography
                ml={ 10 }
                fontSize={ 15 }
                regular
                text="Скопировано!"
                align="left"
                color={ colors.green }
              />
              )

            }

          </TouchableOpacity>

          {
            mapAppState.map(el => (
              <TouchableOpacity
                key={ el.id }
                onPress={ () => {
                  if (!el.disable) {
                    handlerCreateDrivePath(el.id);
                  }
                } }
                disabled={ el.disable }
                style={{
                  borderTopWidth: 1,
                  paddingVertical: perfectSize(10),
                  borderTopColor: '#f9f9f9',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >

                <Image
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#f9f9f9',
                    width: perfectSize(32),
                    height: perfectSize(32),
                    resizeMode: 'contain',
                    marginRight: perfectSize(15),
                  }}
                  source={ el.resolveIcon() }
                />

                <Typography
                  text={ el.name }
                  regular
                  fontSize={ 15 }
                  align="left"
                  color={ el.disable
                    ? '#999'
                    : '#333' }
                />
              </TouchableOpacity>
            ))
          }
        </Animatable.View>
      );
    }

    return null;
  };

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: perfectSize(439),
        paddingVertical: perfectSize(20),
      }}
    >
      <Container paddingSize={ 8 }>
        {
          stepModal === 0
            ? (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 40,
              }}
              >
                {currentClinic && currentClinic.city && city && (
                <Typography text={ city.name } align="left" color="#333333" />
                )}
                <LinkText text="Как добраться? " onClick={ () => fadeInRight(1) } />
              </View>
            )
            : (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 40,
              }}
              >
                <Typography text="Как добраться?" align="left" color="#333333" />
                <LinkText text="Назад" onClick={ () => fadeInRight(0) } />
              </View>
            )
        }

        {
          renderMapItemContent()
        }

      </Container>
    </View>
  );
};

export default MapMarkerItem;

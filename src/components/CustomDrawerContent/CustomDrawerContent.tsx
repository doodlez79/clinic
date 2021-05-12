import React, { FC, useEffect, useState } from 'react';
import { DrawerActions } from '@react-navigation/native';
import {
  TouchableHighlight,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';

import Title from 'components/Title/Title';
import { CloseBtn } from 'components/CloseBtn';
import { Container } from 'components/Container';
import { ModalComponent } from 'components/Modal';
import { ModalSelect } from 'components/ModalSelect';
import { colors } from 'constants/colors';
import File from 'Icons/File.svg';
import Edit from 'Icons/Edit.svg';
import { Typography } from 'components/Typography';
import { Actions, Selectors } from 'ducks';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';
import CustomDrawerItem from 'components/CustomDrawerItem/CustomDrawerItem';

import { perfectSize } from 'helpers/perfectSize';
import { setUserCity } from 'ducks/User/actions';
import { Screens } from './CustomDrawerContent.config';

const CustomDrawerContent: FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const cityOptions = bySelectedType(useSelector(Selectors.Misc.getCities));
  const profile = useSelector(Selectors.User.isProfile);
  const isAuthorized = useSelector(Selectors.Auth.isAuthorized);
  const dispatch = useDispatch();
  const [ selectedValue, setSelectedValue ] = useState(
    profile.city ? profile.city.id : null,
  );
  const [ modalState, setModalState ] = useState(false);
  const getNotificationsArray = useSelector(
    Selectors.Notifications.getNotificationsArray,
  );

  /* колличество нотификаций */
  const lengthNewNotifications = (getNotificationsArray || []).filter(
    el => el.isNewNotification,
  ).length;

  /* текущий город */
  const currentCity = profile.city
    && profile.city.id
    && cityOptions.find(el => el.value === profile.city!.id.toString())
    ? cityOptions.find(el => el.value === profile.city!.id.toString())!.label
    : '';

  useEffect(() => {
    if (selectedValue && isAuthorized) {
      dispatch(
        Actions.User.patchUser.request(
          {
            ...profile,
            city: {
              id: selectedValue,
            },
          },
          {
            resolve: () => {},
          },
        ),
      );
    } else if (selectedValue) {
      dispatch(setUserCity({ id: selectedValue }));
    }
  }, [ selectedValue ]);
  return (
    <SafeAreaView style={{ flex: 1, marginTop: perfectSize(24) }}>
      <Container flex={ 1 } paddingSize={ 8 }>
        <View
          style={{
            marginTop: perfectSize(22),
            marginBottom: perfectSize(55),
            zIndex: 999,
            position: 'relative',
          }}
        >
          <Title title="Клиника-Сити" />

          <TouchableOpacity
            onPress={ () => setModalState(true) }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography
              text={ currentCity || 'Выберите город' }
              color={ colors.greenBtn }
            />
            <Edit strokeProps="#999" />
          </TouchableOpacity>
        </View>
        <CloseBtn
          onClose={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
        />

        <View
          style={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <View>
            {Screens.map(
              (item: {
                id: string | number | null | undefined;
                title: string;
                path: string;
                icon: () => React.ReactNode;
              }) => {
                if (item.path === 'Notifications') {
                  return (
                    <CustomDrawerItem
                      customElem={ (
                        <View
                          style={{
                            position: 'absolute',
                            right: perfectSize(40),
                          }}
                        >
                          {Boolean(lengthNewNotifications) && (
                            <Typography
                              color={ colors.green }
                              text={ `+${lengthNewNotifications}` }
                            />
                          )}
                        </View>
                      ) }
                      key={ item.id }
                      title={ item.title }
                      icon={ item.icon }
                      onPress={ () => navigation.navigate(item.path) }
                    />
                  );
                }
                return (
                  <CustomDrawerItem
                    key={ item.id }
                    title={ item.title }
                    icon={ item.icon }
                    onPress={ () => navigation.navigate(item.path) }
                  />
                );
              },
            )}
          </View>
          <View>
            <TouchableHighlight
              onPress={ () => navigation.navigate('About') }
              underlayColor="#fff"
              activeOpacity={ 0.5 }
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: perfectSize(17),
                }}
              >
                <File />
                <Typography
                  text="О приложении"
                  color="#999"
                  fontSize={ 15 }
                  ml={ 10 }
                  regular
                />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Container>
      <ModalComponent
        setModalVisible={ () => setModalState(false) }
        modalVisible={ modalState }
      >
        <ModalSelect
          value={ (profile.city && profile.city.id) || '' }
          title="Выбор города"
          options={ cityOptions }
          onClickItem={ value => {
            setModalState(false);
            setSelectedValue(value);
          } }
        />
      </ModalComponent>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

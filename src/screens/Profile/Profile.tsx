import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { Typography } from 'components/Typography';
import { Container } from 'components/Container';
import { CloseBtn } from 'components/CloseBtn';
import { Title } from 'components/Title';

import { KeyboardAvoidingView } from 'components/KeyboardAvoidingView';
import { Actions, Selectors } from 'ducks';
import { ProfileContentAuth } from 'components/ProfileContentAuth';
import { ContentNoAuth } from 'components/ContentNoAuth';
import HelpDeveloper from 'Icons/HelpDeveloper.svg';
import LogOut from 'Icons/LogOut.svg';

import { POSITION_TYPE } from 'components/Modal/Modal.types';
import ProfileError from 'Icons/ProfileError.svg';
import { Btn } from 'components/Btn';
import { ModalComponent } from 'components/Modal';
import { perfectSize } from 'helpers/perfectSize';
import { IconResize } from 'components/IconResize';
import { ProfileScreenProps } from './Profile.types';

import { styles } from './styles';

const { height } = Dimensions.get('window');

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const [ modal, setModal ] = useState(false);
  const [ errors, setErrors ] = useState({});
  const [ refreshLoading, setRefreshLoading ] = useState(false);
  const profileUser = useSelector(Selectors.User.isProfile);
  const loading = useSelector(Selectors.User.isLoading);
  const isAuthorized = useSelector(Selectors.Auth.isAuthorized);
  const isConnected = useSelector(Selectors.App.isConnection);
  const dispatch = useDispatch();

  const getProfile = useCallback(() => {
    dispatch(Actions.User.getUser.request());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshLoading(true);
    dispatch(Actions.User.getUser.request());
  }, []);
  useFocusEffect(getProfile);

  const logout = useCallback(() => {
    dispatch(
      Actions.Auth.signOut.request({
        resolve: () => {
          navigation.navigate('Home');
        },
      }),
    );
  }, [ dispatch ]);

  const closeAuthRout = useCallback(() => {
    navigation.goBack();
  }, []);
  const pushToAuthPage = useCallback(() => {
    navigation.navigate('Auth');
  }, []);

  const submitProfile = useCallback(values => {
    dispatch(
      Actions.User.patchUser.request(values, {
        resolve: () => {
          if (values.emailAwaitingConfirmation && values.emailAwaitingConfirmation !== values.email) {
            setModal(true);
          }
        },
        reject: err => {
          setErrors(err.error);
        },
      }),
    );
  }, []);

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: safeAreaInsets.top, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: perfectSize(16),
          paddingBottom: safeAreaInsets.bottom,
        }}
        refreshControl={ <RefreshControl refreshing={ refreshLoading && loading } onRefresh={ onRefresh } /> }
        showsVerticalScrollIndicator={ false }
      >
        <KeyboardAvoidingView>
          <View style={{
            paddingHorizontal: 16,
            height: isAuthorized ? 'auto' : height - safeAreaInsets.top - perfectSize(16) - safeAreaInsets.bottom,
          }}
          >
            <CloseBtn top={ 0 } onClose={ closeAuthRout } />
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 0,
                marginBottom: perfectSize(20),
              }}
            >
              <Title title="Профиль" />
              {
                isAuthorized && (
                  <View>
                    <Text style={ styles.name }>{profileUser.name}</Text>
                  </View>
                )
              }

            </View>
            <View
              style={{
                flexGrow: 1,
                justifyContent: 'space-between',
              }}
            >
              <Container paddingSize={ 8 }>
                {isAuthorized ? (
                  <ProfileContentAuth
                    errors={ errors }
                    clearErrors={ () => setErrors({}) }
                    submit={ submitProfile }
                    initialValues={ profileUser }
                  />
                ) : (
                  <ContentNoAuth isConnected={ isConnected } onClick={ pushToAuthPage } />
                )}
              </Container>
              <View>
                <TouchableOpacity
                  onPress={ () => navigation.navigate('Feedback') }
                  style={{ ...styles.logoutButton, borderTopWidth: 0 }}
                >
                  <IconResize size={ 20 }>
                    <HelpDeveloper />
                  </IconResize>
                  <Typography
                    fontSize={ 15 }
                    regular
                    color="#999"
                    ml={ 10 }
                    text={ isAuthorized ? 'Сообщить об ошибке' : 'Связаться с нами' }
                  />
                </TouchableOpacity>
                {isAuthorized && (
                  <TouchableOpacity style={ styles.logoutButton } onPress={ logout }>
                    <IconResize size={ 20 }>
                      <LogOut />
                    </IconResize>

                    <Typography
                      fontSize={ 15 }
                      regular
                      color="#999"
                      ml={ 10 }
                      text="Выйти"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <ModalComponent
        width="95%"
        position={ POSITION_TYPE.CENTER }
        modalVisible={ modal }
        setModalVisible={ () => {} }
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: perfectSize(32),
          }}
        >
          <ProfileError />
          <Typography
            style={{
              maxWidth: perfectSize(190),
            }}
            /* eslint-disable-next-line max-len */
            text={ `Подтвердите ${profileUser.emailAwaitingConfirmation} эл. почту, перейдя по ссылке в отправленном Вам письме` }
            color="#999999"
            ml={ 8 }
            mb={ 16 }
            regular
            fontSize={ 13 }
            align="center"
          />
          <Btn Title="Понятно" onClick={ () => setModal(false) } />
        </View>
      </ModalComponent>
    </View>
  );
};

export default ProfileScreen;

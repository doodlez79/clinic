import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import InputCode from 'react-native-input-code';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator, SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Back from 'Icons/Back.svg';
import { Container } from 'components/Container';
import { CloseBtn } from 'components/CloseBtn';
import { colors } from 'constants/colors';
import { clearErrors } from 'ducks/Auth/actions';
import { Actions, Selectors } from 'ducks';
import { ModalComponent } from 'components/Modal';
import ErrorCode from 'Icons/ErrorCode.svg';
import { LinkText } from 'components/LinkText';
import { ModalContent } from 'components/ModalContent';

import { Typography } from 'components/Typography';
import { KeyboardAvoidingView } from 'components/KeyboardAvoidingView';
import { perfectSize } from 'helpers/perfectSize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TYPE_DEVICE } from 'ducks/Notifications/Notifications.types';
import { ErrorField } from 'components/ErrorField';
import { ErrorsHandler } from 'helpers/ErrorsHandler/ErrorsHandler';
import { CodeScreenProps } from './Code.types';
import { styles } from './styles';

const CodeScreen: FC<CodeScreenProps> = ({ navigation }) => {
  const [ counter, setCounter ] = useState<number | undefined>(
    useSelector(Selectors.Auth.RenewAfter),
  );
  const [ code, setCode ] = useState('');
  const [ modalState, setModalState ] = useState(false);
  const number = useSelector(Selectors.Auth.isPhone);
  const loading = useSelector(Selectors.Auth.isLoading);
  const token = useSelector(Selectors.Auth.isToken);
  const profile = useSelector(Selectors.User.isProfile);
  const errMessage = useSelector(Selectors.Auth.isError);
  const notificationsId = useSelector(Selectors.Notifications.getTokenNotification);
  const notificationsDevice = useSelector(Selectors.Notifications.getNotificationDevice);
  const dispatch = useDispatch();

  const refInput = useRef<InputCode>(null);

  useEffect(() => {
    if (code.length === 4 && token) {
      dispatch(
        Actions.Auth.signIn.getAccessToken.request(
          { uuid: token, code },
          {
            resolve: () => {
              if (notificationsId) {
                dispatch(Actions.Notification.sendIdNotification.request({
                  id: notificationsId,
                  device: notificationsDevice.toLocaleUpperCase() as TYPE_DEVICE,
                }, {
                  resolve: () => navigation.replace('Main'),
                  reject: () => navigation.replace('Main'),
                }));
              } else {
                navigation.replace('Main');
              }
            },
          },
        ),
      );
    }
  }, [ code ]);

  const repeatSendCode = useCallback(() => {
    if (token) {
      dispatch(
        Actions.Auth.reSend.request(token, {
          resolve: RenewAfter => {
            setModalState(false);
            setCounter(RenewAfter);
          },
        }),
      );
    }
  }, []);

  const onChangeCode = useCallback((value: string) => {
    setCode(value);
  }, []);

  const onFullFill = useCallback(() => {
    setTimeout(() => {
      refInput.current?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setCounter(s => {
        if (s && s > 0) {
          return s - 1;
        }
        return s;
      }),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const resetTimer = () => {
    setCounter(60);
  };
  const goBack = () => {
    dispatch(Actions.Auth.signIn.authInit.request(number || '', {
      resolve: () => {
        resetTimer();
        navigation.goBack();
      },
      reject: () => {},
    }));
  };
  const onCloseAuthRout = useCallback(() => {
    navigation.replace('Main');
  }, []);
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: safeAreaInsets.top }}>
      <KeyboardAvoidingView>
        <Container paddingSize={ 16 }>
          <TouchableHighlight
            style={ styles.backBtn }
            onPress={ goBack }
            underlayColor="#51994C"
          >
            <Back />
          </TouchableHighlight>
          <CloseBtn onClose={ onCloseAuthRout } />
          <View
            style={{
              marginTop: perfectSize(80),
            }}
          >
            <Typography text="Введите код" fontSize={ 28 } mb={ 32 } />
            <Typography
              fontSize={ 13 }
              color="#999999"
              regular
              mb={ 64 }
            >
              <Typography fontSize={ 13 } color="#999999">
                {`${profile.name}, `}
              </Typography>
              <Typography regular fontSize={ 13 } color="#999999">
                мы отправили проверочный код на номер
              </Typography>

              <Typography fontSize={ 13 } color="#999999">
                {` ${number}  `}
              </Typography>
              <LinkText
                mt={ 0 }
                onClick={ () => {
                  dispatch(Actions.User.setUserName(''));
                  navigation.navigate('AuthPhone');
                } }
                text="изменить"
              />

            </Typography>
            <View>
              <InputCode
                ref={ refInput }
                length={ 4 }
                onChangeCode={ text => {
                  if (errMessage) {
                    dispatch(clearErrors());
                  }

                  onChangeCode(text);
                } }
                onFullFill={ onFullFill }
                codeTextStyle={{
                  fontSize: perfectSize(34),
                  fontFamily: 'OpenSans-SemiBold',
                  color: '#333',
                }}
                codeContainerStyle={ errMessage
                  ? styles.codeContainerStyleError
                  : styles.codeContainerStyle }
                codeContainerCaretStyle={ styles.codeContainerCaretStyle }
                autoFocus
              />
              {Boolean(errMessage) && typeof errMessage === 'string' && (
                <ErrorField text={ ErrorsHandler(errMessage) } />
              )}

              {loading && (
                <View
                  style={{
                    marginVertical: 20,
                  }}
                >
                  <ActivityIndicator size="small" color={ colors.green } />
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={ resetTimer }
              disabled={ counter !== 0 }
              style={{
                marginTop: perfectSize(64),
                alignItems: 'center',
                marginBottom: perfectSize(40),
              }}
            >
              <Typography
                style={ counter !== 0
                  ? {
                    color: '#999',
                  }
                  : { color: '#1DBAB8', textDecorationLine: 'underline' } }
                regular
                onPress={ repeatSendCode }
                fontSize={ 13 }
                text={ counter
                  ? `Отправить код повторно через ${counter}`
                  : 'Отправить повторно!' }
              />
            </TouchableOpacity>
            {counter === 0 && (
              <LinkText
                onClick={ () => setModalState(true) }
                text="Не приходит код?"
              />
            )}
            <ModalComponent
              setModalVisible={ () => setModalState(false) }
              modalVisible={ modalState }
            >
              <ModalContent
                icon={ () => <ErrorCode /> }
                linkText="Отправить повторно"
                title="Не пришел код?"
                linkPress={ repeatSendCode }
                /* eslint-disable-next-line max-len */
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              />
            </ModalComponent>
          </View>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CodeScreen;

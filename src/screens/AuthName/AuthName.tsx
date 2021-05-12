import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View } from 'react-native';

import { InputField } from 'components/InputField';
import { Container } from 'components/Container';
import { Btn } from 'components/Btn';
import { Actions, Selectors } from 'ducks';
import { LinkText } from 'components/LinkText';

import { isToken } from 'ducks/Auth/selectors';
import { Typography } from 'components/Typography';
import RightArrow from 'Icons/RightArrow.svg';
import { KeyboardAvoidingView } from 'components/KeyboardAvoidingView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthNameProps } from './AuthName.types';
import { styles } from './styles';

const AuthName: FC<AuthNameProps> = ({ navigation }) => {
  const profile = useSelector(Selectors.User.isProfile);
  const loading = useSelector(Selectors.Auth.isLoading);
  const [ name, setName ] = useState<string>(profile.name);
  const dispatch = useDispatch();
  const token = useSelector(isToken);

  const cancelAuth = useCallback(() => {
    if (token) {
      dispatch(
        Actions.Auth.cancelAuth.request(token, {
          resolve: () => {
            setName('');
            navigation.navigate('Home');
          },
        }),
      );
    }
  }, []);

  const authSendName = useCallback(() => {
    dispatch(
      Actions.Auth.signIn.getCode.request(
        { tokenSession: token || '', name },
        {
          resolve: () => navigation.navigate('AuthCode'),
        },
      ),
    );
  }, [ name ]);

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: safeAreaInsets.top }}>
      <KeyboardAvoidingView>
        <View style={ styles.container }>
          <Container paddingSize={ 16 }>
            <Typography text="Вы у нас впервые" fontSize={ 28 } mb={ 32 } />
            <Typography
              text="Мы рады Вас видеть! Введите своё имя, чтобы мы знали, как к Вам обращаться."
              fontSize={ 13 }
              color="#999999"
              regular
              mb={ 64 }
            />
            <InputField
              mb={ 64 }
              editFlagProps
              autoCompleteType="name"
              value={ name }
              label="Ваше имя"
              onChange={ e => setName(e) }
              withOutIcon
            />
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <Btn
                loading={ loading }
                fullWight
                Title="Далее"
                disabled={ !(name.length > 0) }
                onClick={ authSendName }
                Icon={ <RightArrow strokeProps="white" /> }
              />
            </View>

            <LinkText
              color="#999999"
              onClick={ cancelAuth }
              text="Отменить регистрацию"
            />
          </Container>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthName;

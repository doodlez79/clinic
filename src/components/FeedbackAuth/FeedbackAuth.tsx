import React, { FC, useState } from 'react';
import { TextInput, View } from 'react-native';

import { Typography } from 'components/Typography';
import { Btn } from 'components/Btn';
import { SizeBtn } from 'components/Btn/Btn.types';
import { colors } from 'constants/colors';

import { InputField } from 'components/InputField';
import { ModalSelect } from 'components/ModalSelect';
import { ModalComponent } from 'components/Modal';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';
import { ErrorField } from 'components/ErrorField';

import { perfectSize } from 'helpers/perfectSize';
import { FeedbackAuthProps } from './FeedbackAuth.types';
import { styles } from './styles';

const FeedbackAuth: FC<FeedbackAuthProps> = ({
  name,
  value,
  handlerSubmit,
  onChange,
  errors,
  themeValue,
  emailValue,
  isConnected,
}) => {
  const [ modalThemes, setModalThemes ] = useState(false);
  const themes = bySelectedType(
    useSelector(Selectors.Misc.getFeedBackThemes),
    'subject',
  );
  const loading = useSelector(Selectors.RecordFeedback.isLoading);

  const findTheme = themes.find(el => el.value === themeValue.toString());
  const themeValueCurrent = findTheme ? findTheme.label : '';

  const getBorderField = () => {
    let result = '#F5F7FA';
    if (value) {
      result = colors.green;
    }
    if (errors.description) {
      result = 'red';
    }
    return result;
  };
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: perfectSize(95),
      }}
    >
      <View>
        <Typography fontSize={ 13 } color="#999999" regular mb={ 64 }>
          <Typography fontSize={ 13 } color="#999999">
            { `${name}, ` }
          </Typography>
          <Typography regular fontSize={ 13 } color="#999999">
            опишите как можно подробнее проблему, с которой Вы столкнулись
          </Typography>
        </Typography>
      </View>
      <View
        style={{
          width: '100%',
          marginBottom: perfectSize(20),
        }}
      >
        <InputField
          label="Тема"
          error={ errors.theme as string }
          value={ themeValueCurrent as string }
          placeholder="Тема"
          onClick={ () => setModalThemes(true) }
        />

        <InputField
          label="Эл. почта"
          value={ emailValue }
          error={ errors.email as string }
          placeholder="E-mail"
          autoCompleteType="email"
          onChange={ text => onChange(text, 'email') }
        />
        <Typography
          text="Описание"
          regular
          mb={ 5 }
          align="left"
          ml={ 8 }
          fontSize={ 13 }
          color="#999999"
        />
        <TextInput
          style={{
            ...styles.textInput,
            borderColor: getBorderField(),
          }}
          multiline
          numberOfLines={ 4 }
          onChangeText={ text => onChange(text, 'description') }
          value={ value }
        />
        {Boolean(errors.description) && (
          <ErrorField text={ errors.description as string } />
        )}
        <View
          style={{
            alignItems: 'center',
            marginTop: perfectSize(64),
            width: '100%',
          }}
        >
          <Btn
            loading={ loading }
            Title="Отправить"
            size={ SizeBtn.SMALL }
            onClick={ handlerSubmit }
            disabled={ !isConnected }
          />
        </View>
      </View>

      <ModalComponent
        setModalVisible={ () => setModalThemes(false) }
        modalVisible={ modalThemes }
      >
        <ModalSelect
          value={ themeValue }
          title="Выбор темы"
          options={ themes }
          onClickItem={ value => {
            setModalThemes(false);
            onChange(value, 'theme');
          } }
        />
      </ModalComponent>
    </View>
  );
};

export default FeedbackAuth;

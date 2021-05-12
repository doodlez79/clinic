import React, { FC, useState } from 'react';

import { View, TextInput } from 'react-native';
import { InputField } from 'components/InputField';
import { colors } from 'constants/colors';
import { SizeBtn } from 'components/Btn/Btn.types';
import { Btn } from 'components/Btn';
import { Typography } from 'components/Typography';

import { ModalSelect } from 'components/ModalSelect';
import { ModalComponent } from 'components/Modal';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';
import { perfectSize } from 'helpers/perfectSize';
import { ErrorField } from 'components/ErrorField';
import { styles } from './styles';
import { FeedbackNoAuthProps } from './FeedbackNoAuthProps.types';

const FeedbackNoAuth: FC<FeedbackNoAuthProps> = ({
  nameValue,
  emailValue,
  descriptionValue,
  onChange,
  handlerSubmit,
  themeValue,
  errors,
  isConnected = false,
}) => {
  const [ modalThemes, setModalThemes ] = useState(false);
  const themes = bySelectedType(
    useSelector(Selectors.Misc.getFeedBackThemes),
    'subject',
  );

  const findTheme = themes.find(el => el.value === themeValue);

  const colorBorderDescription = () => {
    let color = '#F5F7FA';
    if (errors.description) {
      color = colors.red;
    }
    if (descriptionValue) {
      color = colors.green;
    }
    return color;
  };

  const themeValueCurrent = findTheme ? findTheme.label : '';

  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: perfectSize(95),
      }}
    >
      <View
        style={{
          width: '100%',
        }}
      >
        <InputField
          label="Ваше имя"
          error={ errors.name as string }
          value={ nameValue }
          placeholder="Ваше имя"
          onChange={ text => onChange(text, 'name') }
        />
        <InputField
          label="Эл. почта"
          value={ emailValue }
          error={ errors.email as string }
          placeholder="E-mail"
          autoCompleteType="email"
          onChange={ text => onChange(text, 'email') }
        />
        <InputField
          error={ errors.theme as string }
          label="Тема"
          value={ themeValueCurrent as string }
          placeholder="Тема"
          onClick={ () => setModalThemes(true) }
        />
      </View>

      <View
        style={{
          width: '100%',
          maxHeight: perfectSize(132),
          height: '100%',
        }}
      >
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
            borderColor: colorBorderDescription(),
          }}
          multiline
          numberOfLines={ 4 }
          onChangeText={ text => onChange(text, 'description') }
          value={ descriptionValue }
        />
        {Boolean(errors.description) && <ErrorField text={ errors.description as string } />}

      </View>
      <View style={ styles.btnContainer }>
        <Btn Title="Отправить" size={ SizeBtn.SMALL } disabled={ !isConnected } onClick={ handlerSubmit } />
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

export default FeedbackNoAuth;

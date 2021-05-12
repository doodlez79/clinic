import React, { FC, useEffect, useState } from 'react';

import {
  View, TouchableHighlight, Dimensions,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from 'components/Typography';
import { colors } from 'constants/colors';
import Close from 'Icons/Close.svg';
import { bySelectedType } from 'helpers/BySelectedType/BySelectedType';
import { ModalSelect } from 'components/ModalSelect';
import { ModalContent } from 'components/ModalContent';
import { InputField } from 'components/InputField';
import { Btn } from 'components/Btn';
import { perfectSize } from 'helpers/perfectSize';

type props = {
  options: {id: string, url: string, removable: boolean}[]
  inputValue: {id: string, url: string}
  selectedUrl: {id: string, url: string, removable: boolean}
  setModalUrls: (value: boolean) => void
  deleteElem: (value: string) => void
  selectedItem: (value: string) => void
  setUrlValue: (value: {id: string, url: string, removable: boolean}) => void
  addUrl: (cb: () => void) => void
  setErrors: (value: string) => void
  loading: boolean
  error?: string

}

const DevelopUrlContent:FC<props> = ({
  options, selectedUrl, setModalUrls, selectedItem,
  setUrlValue, inputValue,
  addUrl,
  deleteElem,
  loading,
  error,
  setErrors,
}) => {
  const [ modalStep, setModalStep ] = useState(0);

  useEffect(() => {
    setUrlValue({ id: '', url: '', removable: true });
    setErrors('');
  }, [ modalStep ]);

  if (modalStep === 0) {
    return (
      <ModalSelect
        value={ selectedUrl.url }
        title="Выбор URL"
        linkText="Добавить URL"
        linkPress={ () => setModalStep(1) }
        customItem={ item => (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          >
            <Typography
              color={ item.value === selectedUrl.id ? colors.greenBtn : '#333' }
              fontSize={ 15 }
              regular
              align="left"
              text={ item.label }
            />
            {
                  item.value !== selectedUrl.url && item.props.removable && (
                    <TouchableHighlight
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      onPress={ () => deleteElem(item.value) }
                    >
                      <Close />
                    </TouchableHighlight>
                  )
                }

          </View>
        ) }
        options={ bySelectedType(options, 'url') }
        onClickItem={ value => {
          setModalUrls(false);
          selectedItem(value);
        } }
      />
    );
  }
  if (modalStep === 1) {
    return (
      <ModalContent
        title="Добавление  Url"
        linkText="Назад"
        linkPress={ () => setModalStep(0) }
        style={{ maxHeight: perfectSize(550), width: Dimensions.get('window').width }}
      >

        <View
          style={{
            width: '100%',
            padding: 16,
            flex: 1,
          }}
        >
          <InputField
            label="URl"
            value={ inputValue.url }
            onChange={ e => {
              setErrors('');
              setUrlValue({
                id: uuidv4(),
                url: e,
                removable: true,
              });
            } }
          />
          {
            Boolean(inputValue.url) && (
              <Btn
                Title="Добавить"
                loading={ loading }
                onClick={ () => {
                  if (options.map(el => el.url).includes(inputValue.url)) {
                    setErrors('Url существует');
                  } else {
                    addUrl(() => setModalStep(0));
                  }
                } }
              />
            )
          }
          {
            Boolean(error) && (
              <Typography regular fontSize={ 13 } color={ colors.red } text={ error } />
            )
          }

        </View>

      </ModalContent>
    );
  }
  return null;
};

export default DevelopUrlContent;

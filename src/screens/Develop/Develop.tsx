import React, {
  FC, useCallback, useContext, useEffect, useState,
} from 'react';

import {
  View, Dimensions,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { perfectSize } from 'helpers/perfectSize';

import { InputField } from 'components/InputField';
import { Btn } from 'components/Btn';
import * as Updates from 'expo-updates';
import { Typography } from 'components/Typography';
import { ModalComponent } from 'components/Modal';
import { DevelopUrlContent } from 'components/DevelopUrlContent';
import PersistContext from 'helpers/PersistContext/PersistContext';

const DevelopScreen:FC = () => {
  const allUrls = useSelector(Selectors.Develop.getAllUrls);
  const mainUrl = useSelector(Selectors.Develop.getMainUrl);
  const loading = useSelector(Selectors.Develop.isLoading);
  const [ selectedUrlId, setSelectedUrl ] = useState(mainUrl);
  const [ urlValue, setUrlValue ] = useState({ id: '', url: '', removable: false });
  const [ modalUrls, setModalUrls ] = useState(false);
  const [ error, setErrors ] = useState('');
  const dispatch = useDispatch();

  const persistor = useContext(PersistContext);

  useEffect(() => {
    setSelectedUrl(mainUrl);
  }, [ mainUrl ]);

  const deleteElem = (id: string) => {
    dispatch(Actions.Develop.deleteElem(id));
  };
  const addUrl = (cb: () => void) => {
    dispatch(Actions.Develop.checkUrl.request({
      ...urlValue,
      data: {
        test: 'ping',
      },
    }, {
      resolve: () => cb(),
      reject: (err: string) => setErrors(err),
    }));
  };

  const setModalFunc = useCallback(() => {
    setModalUrls(false);
  }, []);

  const setElement = useCallback(value => {
    setSelectedUrl(allUrls.find(el => el.id === value)!);
  }, []);

  const saveUrl = useCallback(() => {
    dispatch(Actions.Develop.changeMainUrl(selectedUrlId.id));
    persistor?.flush().then(() => Updates.reloadAsync()).catch(() => {});
  }, [ selectedUrlId ]);

  return (
    <View style={{
      padding: perfectSize(16),
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 100,
    }}
    >
      <Typography text="Url" />

      <InputField
        editFlagProps={ false }
        label="Url"
        value={ selectedUrlId.url }
        placeholder="Не выбрано"
        onClick={ () => setModalUrls(true) }
      />

      {
          ((selectedUrlId !== mainUrl)) && (
            <Btn
              Title="Сохранить"
              onClick={ saveUrl }
            />
          )
        }

      <ModalComponent
        setModalVisible={ setModalFunc }
        modalVisible={ modalUrls }
      >

        <DevelopUrlContent
          deleteElem={ deleteElem }
          setErrors={ setErrors }
          error={ error }
          loading={ loading }
          addUrl={ addUrl }
          inputValue={ urlValue }
          setUrlValue={ setUrlValue }
          options={ allUrls }
          selectedItem={ setElement }
          selectedUrl={ selectedUrlId }
          setModalUrls={ setModalUrls }
        />

      </ModalComponent>

    </View>

  );
};

export default DevelopScreen;

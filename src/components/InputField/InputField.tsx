import React, {
  FC, useCallback, useState,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, TextInput, TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import Edit from 'Icons/Edit.svg';
import { colors } from 'constants/colors';
import { Typography } from 'components/Typography';
import { ErrorField } from 'components/ErrorField';
import { perfectSize } from 'helpers/perfectSize';
import { InputFieldProps } from './InputField.types';
import { styles } from './styles';

const InputField: FC<InputFieldProps> = ({
  value,
  error,
  onChange,
  onClick,
  label,
  disableEdit = false,
  status,
  placeholder,
  autoCompleteType = 'off',
  disable,
  withOutIcon = false,
  editFlagProps = false,
  mb = perfectSize(16),
}) => {
  const [ editFlag, setEditFlag ] = useState(editFlagProps);
  useFocusEffect(
    useCallback(() => () => {
      setEditFlag(false);
    }, []),

  );
  const textColor = () => {
    let color = '#333';
    if (!value && placeholder) {
      color = '#999';
    }
    if (disable) {
      color = '#e0e0e0';
    }
    return color;
  };

  const getInputStyleActive = () => {
    let result = { ...styles.input, ...styles.edit };

    if (status === 'warning') {
      result = {
        ...result,
        borderColor: '#FFBA00',
      };
    }

    if (error) {
      result = {
        ...result,
        borderColor: 'red',
      };
    }
    return result;
  };
  const getInputStyle = () => {
    let result = styles.input;

    if (status === 'warning') {
      result = {
        ...result,
        borderColor: '#FFBA00',
      };
    }
    if (error) {
      result = {
        ...result,
        borderColor: 'red',
      };
    }
    return result;
  };

  return (
    <View style={{ marginBottom: status ? 8 : mb }}>
      <Typography
        text={ label }
        color="#999999"
        ml={ 8 }
        regular
        fontSize={ 13 }
        align="left"
        style={ editFlag || disable || disableEdit
          ? { ...styles.label, color: '#999' }
          : styles.label }
      />
      {editFlag && !disableEdit ? (
        <View style={ getInputStyleActive() }>
          <TextInput
            style={ styles.text }
            onBlur={ () => setEditFlag(false) }
            autoFocus={ editFlag }
            autoCompleteType={ autoCompleteType }
            placeholder={ placeholder }
            onChangeText={ onChange }
            value={ value || '' }
          />
          {!withOutIcon && (
            <TouchableOpacity onPress={ () => {
              if (onChange) {
                onChange('');
              }
              // setEditFlag(false);
            } }
            >
              <AntDesign name="close" color="#999" size={ 22 } />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={ () => {
              if (onClick) {
                onClick();
              } else {
                setEditFlag(true);
              }
            } }
            disabled={ disable }
            style={ disable
              ? { ...getInputStyle(), backgroundColor: '#F5F7FA', borderColor: '#F5F7FA' }
              : getInputStyle() }
          >
            <>
              <Typography
                text={ value || placeholder }
                color={ textColor() }
                ml={ 8 }
                regular
                fontSize={ 17 }
                align="left"
                style={{
                  maxWidth: perfectSize(250),
                }}
              />
              {!disable && <Edit strokeProps={ value ? colors.green : '#999' } />}
            </>
          </TouchableOpacity>
          {Boolean(error) && <ErrorField text={ error } />}
        </>
      )}
    </View>
  );
};

export default InputField;

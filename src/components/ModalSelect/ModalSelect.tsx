import React, { FC, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { ModalSelectProps } from 'components/ModalSelect/ModalSelect.types';
import { LinkText } from 'components/LinkText';
import { Container } from 'components/Container';
import { colors } from 'constants/colors';
import { perfectSize } from 'helpers/perfectSize';
import { Typography } from 'components/Typography';
import { styles } from './styles';

const ModalSelect: FC<ModalSelectProps> = ({
  options,
  title,
  value,
  linkPress,
  onClickItem,
  linkText = 'Выбрать',
  customItem,
}) => {
  const [ selectedItem, setSelectedItem ] = useState<string>(value);

  const selectedItemHandler = () => {
    if (linkPress) {
      linkPress(selectedItem);
    }
  };

  const getColor = (item: {
    label: string;
    value: number | string;
    disable?: boolean;
  }) => {
    let color = '#333';

    if (selectedItem === item.value) {
      color = colors.greenBtn;
    }
    if (item.disable) {
      color = '#999';
    }
    return color;
  };

  const { width } = Dimensions.get('window');
  return (
    <View style={{ ...styles.container, width }}>
      <Container paddingSize={ 8 }>
        <View style={ styles.titleBlock }>
          <Typography text={ title } />
          {linkPress && (
            <LinkText onClick={ selectedItemHandler } text={ linkText } />
          )}
        </View>
        <ScrollView
          style={{
            marginBottom: perfectSize(70),
          }}
        >
          {(options || []).map(item => (
            <TouchableOpacity
              key={ `${item.label}${item.value}` }
              onPress={ () => {
                if (!item.disable) {
                  if (onClickItem) {
                    onClickItem(item.value);
                  }
                  setSelectedItem(item.value);
                }
              } }
              style={{
                borderBottomWidth: 1,
                borderColor: '#f9f9f9',
                padding: perfectSize(20),
              }}
            >
              {
                customItem
                  ? customItem(item)
                  : <Typography color={ getColor(item) } fontSize={ 15 } regular align="left" text={ item.label } />
              }

            </TouchableOpacity>
          ))}
        </ScrollView>
      </Container>
    </View>
  );
};

export default ModalSelect;

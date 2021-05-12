import React, { FC } from 'react';

import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { perfectSize } from 'helpers/perfectSize';

interface ListMarkDownProps {
  items: string[];
  typeList: string;
}

const ListMarkDown: FC<ListMarkDownProps> = ({ items, typeList }) => (
  <View
    style={{
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginBottom: perfectSize(15),
    }}
  >
    {items.map((item, index) => (
      <View
        key={ `${item}_${index * 10}` }
        style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          marginBottom: perfectSize(5),
        }}
      >
        {typeList === 'ordered' ? (
          <Typography
            regular
            color="#999999"
            fontSize={ 17 }
            style={{
              minWidth: perfectSize(15),
            }}
            text={ `${index + 1}.` }
          />
        ) : (
          <View
            style={{
              width: perfectSize(5),
              height: perfectSize(5),
              borderRadius: 100,
              backgroundColor: '#999999',
              marginTop: perfectSize(8),
            }}
          />
        )}
        <Typography
          ml={ 5 }
          regular
          fontSize={ 17 }
          text={ item }
          color="#333"
          align="left"
        />
      </View>
    ))}
  </View>
);

export default ListMarkDown;

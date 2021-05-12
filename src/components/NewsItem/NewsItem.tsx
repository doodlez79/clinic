import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Date from 'Icons/Date.svg';
import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';
import { colors } from 'constants/colors';

import { IconNewsByType } from 'components/NewsItem/News.config';
import { perfectSize } from 'helpers/perfectSize';
import { IconResize } from 'components/IconResize';
import { styles } from './styles';
import { NewsItemProps } from './NewsItem.types';

const NewsItem: FC<NewsItemProps> = ({
  id,
  title,
  description,
  date,
  green,
  category,
}) => {
  const navigation = useNavigation();
  const IconNewsCategory = () => IconNewsByType[category](green ? colors.green : colors.greenBtn);
  return (
    <TouchableOpacity
      style={ styles.container }
      onPress={ () => navigation.navigate('News/Detail', { id, green }) }
    >
      <View
        style={{
          width: perfectSize(48),
          marginRight: perfectSize(24),
        }}
      >
        <IconResize size={ 64 }>
          <IconNewsCategory />
        </IconResize>

      </View>
      <View>
        <Typography
          text={ title }
          align={ alignTextConfig.LEFT }
          style={{ maxWidth: perfectSize(200) }}
          numberOfLines={ 1 }
        />
        <Typography
          text={ description }
          style={{ maxWidth: perfectSize(200) }}
          fontSize={ 13 }
          align={ alignTextConfig.LEFT }
          regular
          numberOfLines={ 2 }
          mb={ 20 }
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Date strokeProps={ colors.green } />
          <Typography
            text={ date }
            fontSize={ 13 }
            color="#999999"
            align={ alignTextConfig.LEFT }
            regular
            ml={ 8 }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsItem;

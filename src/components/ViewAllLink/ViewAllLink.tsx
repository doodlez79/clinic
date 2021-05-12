import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { colors } from 'constants/colors';

import { Typography } from 'components/Typography';
import { perfectSize } from 'helpers/perfectSize';
import { ViewAllLinkProps } from './ViewAllLink.types';

const ViewAllLink: FC<ViewAllLinkProps> = ({ pathName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
      onPress={ () => navigation.navigate(pathName) }
    >
      <Typography fontSize={ 13 } text="Смотреть все" regular color="#999" />
      <AntDesign name="right" size={ perfectSize(16) } color={ colors.green } />
    </TouchableOpacity>
  );
};

export default ViewAllLink;

import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { HomeTitle } from 'components/HomeTitle';
import ViewAllLink from 'components/ViewAllLink/ViewAllLink';
import Services from 'components/Services/Services';

import { Service } from 'ducks/Misc/Misc.types';
import { styles } from './styles';

type Props = {
  mainServices: Service[]
}
const ServicesHome: React.FC<Props> = ({ mainServices }) => {
  const navigation = useNavigation();

  const goPage = React.useCallback((name: string) => {
    navigation.navigate('services', { id: name });
  }, []);

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <HomeTitle title="Услуги" />
        <ViewAllLink pathName="services" />
      </View>
      <Services services={ mainServices } onClickItem={ goPage } />
    </View>
  );
};

export default React.memo(ServicesHome);

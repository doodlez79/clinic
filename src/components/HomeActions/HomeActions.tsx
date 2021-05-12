import React, { FC } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';

import { HomeTitle } from 'components/HomeTitle';
import Action from 'components/Action/Action';
import ViewAllLink from 'components/ViewAllLink/ViewAllLink';
import { colors } from 'constants/colors';
import { Container } from 'components/Container';

import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';
import { getActionsByType } from 'helpers/GetActionsByType/getActionsByType';
import { TYPE_ACTION_CONTENT } from 'components/ActionsContent/ActionsContent.types';
import { perfectSize } from 'helpers/perfectSize';
import { EmptyPromo } from 'components/EmptyPromo';
import { format, isValid } from 'date-fns';
import { FORMAT } from 'constants/formatDate';
import { PromoType } from 'src/ducks/Promo/Promo.types';
import { HomeActionsProps } from './HomeActions.types';

const { width } = Dimensions.get('window');
const HomeActions: FC<HomeActionsProps> = () => {
  const loading = useSelector(Selectors.Promo.isLoading);

  const promosData = useSelector(Selectors.Promo.getAllPromo);
  const clinics = useSelector(Selectors.Misc.getClinics);
  const currentUser = useSelector(Selectors.User.isProfile);

  const currentPromos = promosData.reduce((acc, el) => {
    const currentClinics = clinics.reduce((ac, elem) => {
      if (elem.city?.id
      === currentUser?.city?.id) {
        ac.push(elem.id);
      } return ac;
    }, []as string[]);
    if (el.clinics?.some((item: string) => currentClinics.includes(item))) {
      acc.push(el);
    }
    return acc;
  }, [] as PromoType[]);

  const globalPromos = promosData.filter(item => item.isGlobal === true);
  const currentCityAndGlobalPromos = currentPromos.concat(globalPromos);

  const getActionByType = getActionsByType(
    currentCityAndGlobalPromos,
    TYPE_ACTION_CONTENT.ACTIVE,
  );
  const { active } = getActionByType;

  const data = active.slice(0, 2);

  if (!data.length) {
    return (
      <View style={{
        marginBottom: perfectSize(16),
        paddingHorizontal: perfectSize(16),
      }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: perfectSize(16),
          }}
        >
          <HomeTitle title="Акции" />
          <ViewAllLink pathName="Promo" />
        </View>
        <EmptyPromo />
      </View>
    );
  }
  return (
    <View
      style={{
        marginBottom: perfectSize(16),
      }}
    >
      <Container paddingSize={ 8 }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: perfectSize(16),
          }}
        >
          <HomeTitle title="Акции" />
          <ViewAllLink pathName="Promo" />
        </View>
      </Container>
      {loading && data.length === 0 ? (
        <View
          style={{
            borderRadius: perfectSize(12),
            borderWidth: 2,
            padding: perfectSize(16),
            borderColor: '#F9F9F9',
            marginHorizontal: perfectSize(10),
            maxWidth: perfectSize(329),
            height: perfectSize(115),
          }}
        >
          <SvgAnimatedLinearGradient
            primaryColor="#e8f7ff"
            secondaryColor={ colors.green }
            height={ perfectSize(100) }
          >
            <Rect x="0" y="0" rx="3" ry="3" width="150" height="20" />
            <Rect x="0" y="30" rx="3" ry="3" width="200" height="30" />
            <Rect x="0" y="70" rx="3" ry="3" width="100" height="15" />
          </SvgAnimatedLinearGradient>
          <Svg
            width={ perfectSize(100) }
            height={ perfectSize(50) }
            style={{
              position: 'absolute',
              opacity: 0.5,
              right: perfectSize(12),
              bottom: 0,
            }}
          >
            <Path d="M0,50 a1,1 1 1,1 100,0" fill="#E1F6F6" />
          </Svg>
        </View>
      ) : (
        <FlatList
          data={ data }
          renderItem={ ({ item, index }) => (
            <Action
              category={ item.category }
              style={{
                width: data.length === 1 ? width - perfectSize(32) : width - perfectSize(48),
                marginLeft: index === 0 ? perfectSize(16) : perfectSize(8),
                marginRight: index === data.length - 1 ? perfectSize(16) : perfectSize(8),
              }}
              disable={ !item.lifecycle }
              id={ item.id }
              green={ index % 2 === 0 }
              title={ item.title }
              isInfinity={ item.isInfinity }
              description={ item.description }
              key={ item.id }
              date={ item.endAt && isValid(item.endAt) ? format(item.endAt, FORMAT) : null }
            />
          ) }
          initialNumToRender={ 10 }
          keyExtractor={ (item, index) => `${index}-${item.id}` }
          horizontal
          showsHorizontalScrollIndicator={ false }
        />
      )}
    </View>
  );
};

export default HomeActions;

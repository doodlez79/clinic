import React, { FC, useCallback, useState } from 'react';

import {
  SafeAreaView, FlatList, Platform, View, TouchableOpacity,
} from 'react-native';

import { HistoryBalanceProps } from 'screens/HistoryBalance/HistoryBalance.types';
import { Container } from 'components/Container';
import Phone from 'Icons/Phone.svg';
import Fire from 'Icons/Fire.svg';
import BalanceHistoryItem from 'components/BalanceHistoryItem/BalanceHistoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { format } from 'date-fns';
import { LinkingURLService } from 'services';
import { perfectSize } from 'helpers/perfectSize';
import ProfileError from 'Icons/ProfileError.svg';
import { Typography } from 'components/Typography';
import { alignTextConfig } from 'components/Typography/Typography.types';
import { useFocusEffect } from '@react-navigation/native';
import { FORMAT } from 'constants/formatDate';

const HistoryBalanceScreen:FC<HistoryBalanceProps> = ({ navigation }) => {
  const historyBonuses = useSelector(Selectors.Bonuses.getHistoryBonuses);
  const availableBonuses = useSelector(Selectors.Bonuses.getAvailable);
  const totalBonuses = useSelector(Selectors.Bonuses.getTotalBonuses);
  const loading = useSelector(Selectors.Bonuses.isLoading);
  const multiPhone = useSelector(Selectors.Misc.getMultiPhone);
  const [ loadingRefresh, setLoadingRefresh ] = useState(false);
  const dispatch = useDispatch();
  const availableCount = totalBonuses - availableBonuses;
  const onRefresh = () => {
    setLoadingRefresh(true);
    dispatch(Actions.Bonuses.checkBonuses.request(1));
  };
  useFocusEffect(useCallback(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={ () => LinkingURLService.openURL(`tel:${multiPhone}`) }
        >
          <Phone />
        </TouchableOpacity>
      ),
    });
  }, []));
  return (
    <SafeAreaView style={{ flex: 1 }}>

      {
        Boolean(availableCount) && (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 46,
          }}
          >
            <Fire />
            <View style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}
            >
              <Typography fontSize={ 13 } color="#999999">
                {availableCount}
              </Typography>

              <Typography regular ml={ 3 } mr={ 3 } fontSize={ 13 } color="#999999">
                ожидают начисления
              </Typography>
            </View>

          </View>
        )
      }

      {
        historyBonuses.length !== 0
          ? (
            <FlatList
              contentContainerStyle={{
                paddingBottom: 0,
              }}
              onRefresh={ onRefresh }
              refreshing={ loading && loadingRefresh }
              data={ historyBonuses }
              keyExtractor={ (item, index) => `${index}-${item.id}` }
              onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
              renderItem={ ({ item }) => (

                <Container paddingSize={ 8 }>
                  <BalanceHistoryItem
                    inHold={ item.inHold }
                    isCancelled={ item.isCancelled }
                    text={ item.description }
                    availableDate={ Boolean(item.depositAfter) }
                    date={ item.createdAt ? format(item.createdAt, FORMAT) : '' }
                    count={ item.amount }
                    type={ item.type }
                  />
                </Container>

              ) }
            />
          )
          : (
            <View
              style={{
                height: '20%',
                marginVertical: perfectSize(40),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ProfileError />
              <Typography
                color="#999"
                text="Нет операций по карте"
                align={ alignTextConfig.CENTER }
                style={{
                  maxWidth: perfectSize(190),
                }}
                regular
                mt={ 10 }
                fontSize={ 13 }
              />
            </View>
          )
      }

    </SafeAreaView>
  );
};

export default HistoryBalanceScreen;

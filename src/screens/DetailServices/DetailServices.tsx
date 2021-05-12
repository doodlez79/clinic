import React, { FC, useCallback, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  View, ScrollView, RefreshControl, FlatList, Platform, Image, TouchableOpacity, Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { Selectors } from 'ducks';
import { Container } from 'components/Container';
import { colors } from 'constants/colors';
import { Typography } from 'components/Typography';
import { getContentByMarkDown } from 'helpers/GetContentByMarkDown/getContentByMarkDown';
import { Btn } from 'components/Btn';
import { perfectSize } from 'helpers/perfectSize';
import { RECORD_TYPE } from 'navigation/Navigation.types';
import { alignTextConfig } from 'components/Typography/Typography.types';
import { Block } from 'types/MarkDown';
import ClearIcon from 'Icons/Clear.svg';
import { Stub } from 'components/Stub';
import { emptyAvatarUrl } from 'constants/emptyAvatarUrl';
import { DetailServicesScreenProps } from './DetailServices.types';

import { styles } from './styles';

const DetailServicesScreen: FC<DetailServicesScreenProps> = ({
  navigation,
  route,
}) => {
  const { id, isVisit } = route.params;

  const safeAreaInsets = useSafeAreaInsets();

  const allServices = useSelector(Selectors.Misc.allServices);
  const profile = useSelector(Selectors.User.isProfile);
  const clinics = useSelector(Selectors.Misc.getClinics);
  const doctors = useSelector(Selectors.Misc.getDoctors);
  const loading = useSelector(Selectors.Misc.isLoading);

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ currentAvatar, setCurrentAvatar ] = useState('');

  let isHaveClinics: boolean | null = null;
  let isHaveClinicInCity = [];

  const currentItem = allServices.find(el => el.id === id)!;

  const doctorsByCurrentProductId = doctors?.filter(el => el?.products.some(item => item === id));

  if (profile.city && profile.city.id) {
    const clinicsByIdCity = clinics.filter(el => el.city && el.city.id === profile.city!.id) || [];

    isHaveClinicInCity = currentItem.clinics.filter(el => clinicsByIdCity.map(el => el.id).includes(el));
    isHaveClinics = isHaveClinicInCity.length > 0;
  }
  const countClinicsInCity = isHaveClinicInCity.length;
  const textByClinicsInCity = () => {
    if (isHaveClinics) {
      return `Доступно в ${countClinicsInCity} клиник${countClinicsInCity === 1 ? 'е' : 'ах'} вашего города`;
    }
    return 'Недоступно в вашем городе';
  };

  useFocusEffect(useCallback(() => {
    navigation.setOptions({
      title: currentItem.name,
    });
  }, []));

  let paddingBottom = Math.max(perfectSize(16), safeAreaInsets.bottom);

  if (isHaveClinics) {
    paddingBottom += perfectSize(16) + perfectSize(50);
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingTop: perfectSize(8), paddingBottom }}
        >
          <Container paddingSize={ 8 }>
            { profile.city && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: perfectSize(20),
              }}
            >
              <MaterialIcons
                name="error-outline"
                color={ isHaveClinics ? colors.greenBtn : '#999999' }
                size={ 18 }
              />
              <Typography
                ml={ 5 }
                regular
                fontSize={ 13 }
                text={ textByClinicsInCity() }
                color={ isHaveClinics ? colors.greenBtn : '#999999' }
              />
            </View>
            )}
            <View style={{ flex: 1 }}>
              <ScrollView
                contentContainerStyle={{ paddingBottom: perfectSize(30) }}
                refreshControl={ (
                  <RefreshControl
                    refreshing={ loading }
                    onRefresh={ () => {
                      // eslint-disable-next-line max-len
                      currentItem.markdown?.blocks.map((item: Block, index: number) => getContentByMarkDown(item, index));
                    } }
                  />
) }
              >
                <Container paddingSize={ 8 }>
                  <View
                    style={{
                      position: 'relative',
                      marginBottom: 30,
                    }}
                  >
                    <Typography
                      text={ currentItem.name }
                      fontSize={ currentItem.name.length <= 15 ? 30 : 26 }
                      style={{ maxWidth: 250, minHeight: 65 }}
                      align={ alignTextConfig.LEFT }
                    />
                  </View>
                  {currentItem.markdown?.blocks
              && currentItem.markdown?.blocks.map((item: Block, index: number) => getContentByMarkDown(item, index))}
                </Container>
              </ScrollView>
            </View>
            {(profile.city && isVisit && doctorsByCurrentProductId.length !== 0) && (
            <View style={{
              marginTop: 20,
              paddingHorizontal: perfectSize(16),
              paddingBottom: perfectSize(30),
            }}
            >
              <Typography
                text="Врачи в Вашем городе:"
                fontSize={ 20 }
                align={ alignTextConfig.LEFT }
                style={{ marginBottom: 30 }}
              />
              <FlatList
                contentContainerStyle={{ paddingVertical: perfectSize(16) }}
                showsVerticalScrollIndicator={ false }
                style={{ width: '100%' }}
                data={ doctorsByCurrentProductId }
                keyExtractor={ (item, index) => `${index}-${item.id}` }
                onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
                renderItem={ ({ item }) => (
                  <View
                    key={ item?.firstName }
                    style={{
                      marginBottom: perfectSize(25),
                    }}
                  >
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: perfectSize(15),
                    }}
                    >
                      <TouchableOpacity onPress={ () => {
                        setModalVisible(true);
                        setCurrentAvatar(item?.avatar);
                      } }
                      >
                        <Image
                          style={{
                            width: 60, aspectRatio: 1, borderRadius: 20, marginRight: 15,
                          }}
                          source={{
                            uri: item?.avatar === null
                              ? emptyAvatarUrl
                              : item?.avatar,
                          }}
                        />
                      </TouchableOpacity>
                      <Typography
                        fontSize={ 18 }
                        text={ `${item?.lastName} ${item?.firstName} ${item?.middleName} ` }
                        align={ alignTextConfig.LEFT }
                        mb={ 12 }
                        style={{ flexShrink: 1 }}
                      />
                    </View>
                    {item.markdown?.blocks
                     && item.markdown?.blocks.map((item: Block, index: number) => getContentByMarkDown(item, index))}
                  </View>
                ) }
              />
            </View>
            )}
          </Container>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            paddingHorizontal: perfectSize(16),
            bottom: Math.max(perfectSize(16), safeAreaInsets.bottom),
          }}
        >
          <Btn
            Title="Записаться"
            onClick={ () => navigation.navigate('Record', { servicesId: id, type: RECORD_TYPE.SERVICE }) }
          />
        </View>
      </View>
      <Modal
        transparent
        visible={ modalVisible }
        onRequestClose={ () => setModalVisible(false) }
      >
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
        <ImageViewer
          useNativeDriver
          enableSwipeDown
          backgroundColor="rgba(0, 0, 0, 0.9)"
          imageUrls={ [{ url: currentAvatar, freeHeight: true }] }
          renderHeader={ () => (
            <View
              style={ [ styles.imageModalHeader, { top: safeAreaInsets.top }] }
            >
              <TouchableOpacity
                style={ styles.closeButton }
                onPress={ () => setModalVisible(false) }
              >
                <ClearIcon strokeProps="white" />
              </TouchableOpacity>
            </View>
          ) }
          renderIndicator={ () => <Stub /> }
          onSwipeDown={ () => setModalVisible(false) }
          onCancel={ () => setModalVisible(false) }
        />
      </Modal>
    </>
  );
};

export default DetailServicesScreen;

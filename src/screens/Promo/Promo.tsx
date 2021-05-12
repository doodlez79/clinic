import React, { FC, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { CustomTabs } from 'components/CustomTabs';
import { ActionsContent } from 'components/ActionsContent';
import { TYPE_ACTION_CONTENT } from 'components/ActionsContent/ActionsContent.types';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';

import { PromoScreenProps } from './Promo.types';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = (update: () => void, loading: boolean) => SceneMap({
  all: () => (
    <ActionsContent
      type={ TYPE_ACTION_CONTENT.ALL }
      update={ update }
      loading={ loading }
    />
  ),
  active: () => (
    <ActionsContent
      type={ TYPE_ACTION_CONTENT.ACTIVE }
      update={ update }
      loading={ loading }
    />
  ),
  archive: () => (
    <ActionsContent
      type={ TYPE_ACTION_CONTENT.ARCHIVE }
      update={ update }
      loading={ loading }
    />
  ),
});

const PromoScreen: FC<PromoScreenProps> = () => {
  const [ index, setIndex ] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector(Selectors.Promo.isLoading);

  const update = useCallback(() => {
    dispatch(Actions.Promo.getPromo.request());
  }, []);

  const [ routes ] = useState([
    { key: 'all', title: 'Все' },
    { key: 'active', title: 'Действующие' },
    { key: 'archive', title: 'Архив' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={ renderScene(update, loading) }
      renderTabBar={ props => (
        <CustomTabs
          position={ props.position }
          navigationState={ props.navigationState }
          setIndex={ setIndex }
        />
      ) }
      onIndexChange={ setIndex }
      initialLayout={ initialLayout }
    />
  );
};

export default PromoScreen;

import React, { FC } from 'react';

import { TouchableOpacity } from 'react-native';

import { Typography } from 'components/Typography';
import { Container } from 'components/Container';
import { City } from 'ducks/Misc/Misc.types';
import { perfectSize } from 'helpers/perfectSize';

interface MapListClinicsProps {
  setModalList: () => void;
  moveCameraToLocation: () => void;
  cities: City[];
  id: string;
  address: string;
}

const MapListClinics: FC<MapListClinicsProps> = ({
  setModalList,
  moveCameraToLocation,
  cities,
  id,
  address,
}) => (
  <Container paddingSize={ 4 }>
    <TouchableOpacity
      onPress={ () => {
        setModalList();
        moveCameraToLocation();
      } }
      style={{
        padding: perfectSize(10),
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
      }}
    >
      <Typography
        text={ cities.find(el => el.id === id)!.name }
        align="left"
        mb={ 10 }
        fontSize={ 15 }
      />
      <Typography regular fontSize={ 15 } text={ address } align="left" />
    </TouchableOpacity>
  </Container>
);

export default MapListClinics;

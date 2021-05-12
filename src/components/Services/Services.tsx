import React, { FC } from 'react';
import { View } from 'react-native';

import { ServiceItem } from 'components/ServiceItem';
import {
  ColorCardService,
  TypeCardService,
} from 'components/ServiceItem/ServiceItem.types';

import { perfectSize } from 'helpers/perfectSize';

import { ServicesProps } from './Services.types';

const Services: FC<ServicesProps> = ({ onClickItem, services }) => {
  const createRightArray = () => {
    const servicesCopy = [ ...services ];

    const newArrayTabs = [];

    while (servicesCopy.length / 5 >= 1) {
      newArrayTabs.push([ servicesCopy[0], servicesCopy[1] ], [ servicesCopy[2], servicesCopy[3], servicesCopy[4] ]);
      servicesCopy.splice(0, 5);
    }
    if (servicesCopy.length === 4) {
      newArrayTabs.push([ servicesCopy[0], servicesCopy[1] ], [ servicesCopy[2], servicesCopy[3] ]);
    } else if (servicesCopy.length !== 0) {
      newArrayTabs.push([ ...servicesCopy ]);
    }

    return newArrayTabs;
  };

  const ArrayWithGoodTabs = createRightArray();

  return (
    <View>
      {ArrayWithGoodTabs.map((el, index) => {
        const checkSize = () => {
          if (el.length === 1) {
            return (TypeCardService.MEDIUM);
          } if (el.length === 2) {
            return (TypeCardService.SMALL);
          }
          if (el.length === 3) {
            return (TypeCardService.BIG);
          }
          return TypeCardService.SMALL;
        };

        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: perfectSize(8),
            }}
            key={ String(index) }
          >

            {el.map((item, index) => (
              <ServiceItem
                key={ item.order }
                title={ item.name }
                color={ index % 2 === 0 ? ColorCardService.GREEN : ColorCardService.BLUE }
                type={ checkSize() }
                onClick={ () => onClickItem(item.id) }
                icon={ item.activeIcon }
              />
            ))}

          </View>
        );
      })}

    </View>
  );
};
export default React.memo(Services);

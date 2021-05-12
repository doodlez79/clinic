import React, { FC } from 'react';

import { View } from 'react-native';

import Deposit from 'Icons/Deposit.svg';
import Withdraw from 'Icons/Withdraw.svg';
import Hold from 'Icons/Hold.svg';
import ClockMini from 'Icons/ClockMini.svg';
import Cancel from 'Icons/Cancel.svg';
import HeartSmall from 'Icons/HeartSmall.svg';
import { Typography } from 'components/Typography';
import { colors } from 'constants/colors';
import { TYPE_HISTORY } from 'ducks/Bonuses/Bonuses.types';
import { perfectSize } from 'helpers/perfectSize';
import { IconResize } from 'components/IconResize';
import { BalanceHistoryItemProps } from './BalanceHistoryItem.types';

export const IconByType = {
  [TYPE_HISTORY.DEPOSIT]: (color:string) => <Deposit strokeProps={ color } />,
  [TYPE_HISTORY.WITHDRAW]: (color:string) => <Withdraw strokeProps={ color } />,
  inHold: (color:string) => <Hold strokeProps={ color } />,
  inCancel: (color:string) => <Cancel strokeProps={ color } />,
};

export const TextByType = {
  [TYPE_HISTORY.DEPOSIT]: 'Зачисление',
  [TYPE_HISTORY.WITHDRAW]: 'Списание',
};
const BalanceHistoryItem:FC<BalanceHistoryItemProps> = ({
  type, text, date, count,
  inHold, isCancelled, availableDate,
}) => {
  const colorCount = () => {
    let color = colors.greenBtn;

    if (type === TYPE_HISTORY.WITHDRAW) {
      color = colors.red;
    }
    if (inHold) {
      color = '#E0E0E0';
    }
    return color;
  };

  const renderIcon = () => {
    let icon = null;

    if (type === TYPE_HISTORY.WITHDRAW || type === TYPE_HISTORY.DEPOSIT) {
      icon = IconByType[type](isCancelled ? '#E0E0E0' : colors.green);
    }
    if (inHold) {
      icon = IconByType.inHold(isCancelled ? '#E0E0E0' : colors.green);
    }

    if (isCancelled) {
      icon = IconByType.inCancel(isCancelled ? '#E0E0E0' : colors.green);
    }

    return icon;
  };

  const testByTypeHandler = (bottomText: boolean) => {
    let description = text;

    if (!bottomText && TextByType[type] && !text) {
      description = TextByType[type];
    }

    if (inHold && !bottomText) {
      description = 'В ожидании';
    }

    if (isCancelled && !bottomText) {
      description = 'Отмена';
    }

    return description;
  };

  return (
    <View style={{
      flexDirection: 'row',
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: '#f9f9f9',
      paddingVertical: 8,
    }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      >
        <IconResize size={ 48 }>
          {
              renderIcon()
            }
        </IconResize>
        <View style={{
          marginLeft: perfectSize(8),
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        >
          <Typography
            fontSize={ 15 }
            numberOfLines={ 1 }
            style={{
              maxWidth: perfectSize(250),
              alignItems: 'center',
            }}
            regular
            color={ isCancelled ? '#E0E0E0' : '#333' }
            mb={ 5 }
          >

            <Typography
              fontSize={ 15 }
              numberOfLines={ 1 }
              style={{
                maxWidth: perfectSize(300),
              }}
              regular
              color={ isCancelled ? '#E0E0E0' : '#333' }
              text={ `${TextByType[type]} бонусов` }
              mb={ 5 }
            />

          </Typography>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Typography
              fontSize={ 13 }
              regular
              mr={ 3 }
              text={ date }
              color={ isCancelled ? '#E0E0E0' : '#999' }
            />
            <View style={{
              width: 2,
              height: 2,
              borderRadius: 100,
              backgroundColor: '#999',
              marginRight: 3,
            }}
            />

            {
              availableDate && (
                <>
                  <IconResize size={ 13 }>
                    <ClockMini strokeProps="#999" />
                  </IconResize>
                  <View style={{
                    width: 2,
                    height: 2,
                    borderRadius: 100,
                    backgroundColor: '#999',
                    marginRight: 3,
                    marginLeft: 3,
                  }}
                  />
                </>
              )
            }

            <Typography
              fontSize={ 13 }
              regular
              style={{
                maxWidth: perfectSize(120),
              }}
              numberOfLines={ 1 }
              text={ testByTypeHandler(false) }
              color={ isCancelled ? '#E0E0E0' : '#999' }
            />

          </View>

        </View>

      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      >
        <Typography
          regular
          fontSize={ 15 }
          text={ type === TYPE_HISTORY.DEPOSIT ? `+${count}` : `-${count}` }
          color={ colorCount() }
        />
        <View style={{
          marginLeft: 2,
        }}
        >
          <HeartSmall fill={ colorCount() } />
        </View>

      </View>

    </View>
  );
};

export default BalanceHistoryItem;

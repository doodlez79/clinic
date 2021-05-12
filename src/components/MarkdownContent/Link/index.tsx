import React, { FC } from 'react';

import { LinkText } from 'components/LinkText';
import { View } from 'react-native';
import { perfectSize } from 'helpers/perfectSize';
import { LinkingURLService } from 'services';

export const LinkMarkDown:FC<{text: string, href: string}> = ({ text, href }) => (
  <View style={{
    marginBottom: perfectSize(10),
    alignItems: 'flex-start',
  }}
  >
    <LinkText onClick={ () => LinkingURLService.openURL(href) } text={ text } />
  </View>

);

import React, { FC } from 'react';

import { LinkTextProps } from 'components/LinkText/LinkText.types.ts';
import { Typography } from 'components/Typography';

const LinkText: FC<LinkTextProps> = ({
  onClick,
  text,
  mb = 0,
  mt = 0,
  color = '#1DBAB8',
  fontSize = 13,
}) => (
  <Typography
    onPress={ onClick }
    text={ text }
    regular
    mt={ mt }
    mb={ mb }
    fontSize={ fontSize }
    color={ color }
    style={{
      textDecorationLine: 'underline',
    }}
  />

);

export default LinkText;

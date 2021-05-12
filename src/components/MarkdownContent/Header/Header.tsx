import React, { FC } from 'react';

import { Typography } from 'components/Typography';
import { perfectSize } from 'helpers/perfectSize';

interface HeaderProps {
  text: string;
  level: number;
}

const levelBySize = [ perfectSize(28),
  perfectSize(22),
  perfectSize(20),
  perfectSize(18),
  perfectSize(16) ];

const Header: FC<HeaderProps> = ({ text, level }) => (
  <Typography fontSize={ levelBySize[level] } color="#333" align="left" mb={ 10 }>
    {text}
  </Typography>
);

export default Header;

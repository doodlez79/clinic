import React, { FC } from 'react';
import { Typography } from 'components/Typography';

interface ParagraphProps {
  text: string;
}

const Paragraph: FC<ParagraphProps> = ({ text }) => (
  <Typography regular fontSize={ 17 } color="#333" mb={ 16 } align="left">
    {text}
  </Typography>
);
export default Paragraph;

import React from 'react';

import { Header } from 'components/MarkdownContent/Header';
import { Paragraph } from 'components/MarkdownContent/Paragraph';
import { ImageMarkDown } from 'components/MarkdownContent/ImageMarkDown';
import { Block } from 'types/MarkDown';
import { ListMarkDown } from 'components/MarkdownContent/List';
import { LinkMarkDown } from 'components/MarkdownContent/Link';

export const getContentByMarkDown = ({ data, type }: Block, index: number) => {
  if (type === 'header' && data.text && data.level) {
    return (
      <Header key={ `${index}_${type}` } text={ data.text } level={ data.level } />
    );
  }
  if (type === 'paragraph' && data.text) {
    return <Paragraph key={ `${index}_${type}` } text={ data.text } />;
  }

  if (type === 'image' && data.file?.url) {
    return <ImageMarkDown key={ `${index}_${type}` } url={ data.file?.url } />;
  }
  if (type === 'list' && data.items && data.style) {
    return (
      <ListMarkDown
        key={ `${index}_${type}` }
        items={ data.items }
        typeList={ data.style }
      />
    );
  }

  if (type === 'linkCustom' && data.text && data.url) {
    return (
      <LinkMarkDown
        key={ `${index}_${type}` }
        text={ data.text }
        href={ data.url }
      />
    );
  }

  return null;
};

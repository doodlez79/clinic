import React from 'react';

export interface CustomDrawerItemProps {
  icon: () => React.ReactNode;
  title: string;
  onPress: () => void;

  customElem?: React.ReactNode;
}

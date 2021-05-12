import React from 'react';
import { ViewStyle } from 'react-native';

export enum SizeBtn {
  BIG = 'BIG',
  SMALL = 'SMALL',
}
export enum TypeBtn {
  OUTLINE = 'OUTLINE',
  CONTAINED = 'CONTAINED',
}

export interface BtnProps {
  Title: string | React.ReactNode;
  onClick: () => void;

  fullWight?: boolean;
  style?:ViewStyle,
  loading?: boolean;
  disabled?: boolean;
  Icon?: React.ReactNode;
  size?: SizeBtn;
  typeBtn?: TypeBtn;
}

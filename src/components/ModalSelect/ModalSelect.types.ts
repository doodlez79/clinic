import React from 'react';

export interface ModalSelectProps {
  title: string;
  value: string;

  options?: {
    label: string;
    value: string;
    disable?: boolean;
  }[];
  linkText?: string;
  linkPress?: (value: string) => void;
  customItem?: (item: any) => React.ReactNode
  onClickItem?: (value: string) => void;
}

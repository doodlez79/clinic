import React from 'react';

export interface ModalContentProps {
  title: string;

  text?: string;
  icon?: () => React.ReactNode;
  linkText?: string;
  linkPress?: () => void;
}

import React from 'react';
import { ImageBackgroundProps, StyleProp, ViewStyle } from 'react-native';

interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface ImageOverlayProps extends ImageBackgroundProps {
  style?: StyleProp<OverlayImageStyle>;
  children?: React.ReactNode;
}

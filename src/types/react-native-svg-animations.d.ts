import React from 'react';

interface PropsReactNativeSvgAnimation {
  strokeColor: string;
  duration: number;
  strokeWidth: number;
  height: number | string;
  width: number | string;
  scale: number;
  delay: number;
  revert: boolean;
  d: string;
  loop: boolean;
  children: React.ReactElement;
}

declare module 'react-native-svg-animations' {
  // eslint-disable-next-line no-unused-vars
  export function AnimatedSVGPath(props: PropsReactNativeSvgAnimation);
}

interface interfacePropsSvg {
  primaryColor: string;
  secondaryColor: string;
  height: string | number;
}

declare module 'react-native-svg-animated-linear-gradient' {
  import { FC } from 'react';

  const SvgAnimatedLinearGradient: FC<interfacePropsSvg>;
  export default SvgAnimatedLinearGradient;
}

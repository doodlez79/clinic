// import React, { FC } from 'react';

interface PropsBarcode {
  value: string;
  format: string;
  width: number;
  height?: number
  textColor: string
  lineColor: string
  flat: boolean
  background: string
}

declare module 'react-native-barcode-builder' {
  import { FC } from 'react';

  const Barcode: FC<PropsBarcode>;

  export default Barcode;

}

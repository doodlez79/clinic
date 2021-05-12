export type TYPE_ALIGN_TEXT = 'center' | 'left' | 'right';

export const alignTextConfig: { [x: string]: TYPE_ALIGN_TEXT } = {
  CENTER: 'center',
  LEFT: 'left',
  RIGHT: 'right',
};

export interface TypographyProps {
  text?: string;
  style?: any;
  regular?: boolean;
  mb?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  onPress?: () => void;
  numberOfLines?: number;
  ellipsizeMode?: TYPE_TYPOGRAPHY_ELL;
  align?:
    | typeof alignTextConfig.CENTER
    | typeof alignTextConfig.RIGHT
    | typeof alignTextConfig.LEFT;
  color?: string;
  bold?: boolean;
  fontSize?: number;
}

export enum TYPE_TYPOGRAPHY_ELL {
  HEAD = 'head',
  MIDDLE = 'middle',
  TAIL = 'tail',
}

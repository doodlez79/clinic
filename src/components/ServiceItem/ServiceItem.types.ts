export enum TypeCardService {
  BIG = 'BIG',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM'
}

export enum ColorCardService {
  GREEN = 'GREEN',
  BLUE = 'BLUE',
}

export interface ServiceItemProps {
  title: string;
  type: TypeCardService;
  color: ColorCardService;
  icon: string;
  onClick: () => void;
}

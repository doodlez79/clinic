import { Service } from 'ducks/Misc/Misc.types';

export interface ServicesProps {
  onClickItem: (name: string) => void;

  services: Service[]
}

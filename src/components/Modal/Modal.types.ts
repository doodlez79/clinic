export interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: () => void;

  position?: POSITION_TYPE;
  width?: number | string;
  mb?: number;
  backdropColor?: string;
}

export enum POSITION_TYPE {
  CENTER = 'center',
  END = 'flex-end',
  START = 'flex-start',
}

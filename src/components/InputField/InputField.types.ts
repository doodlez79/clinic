import { TextInputProps } from 'react-native';

export interface InputFieldProps {
  label: string;

  value?: string;
  error?: string;
  autoCompleteType?: TextInputProps['autoCompleteType'];
  withOutIcon?: boolean;
  status?: string;
  placeholder?: string;
  editFlagProps?: boolean;
  disableEdit?: boolean;
  disable?: boolean;
  mb?: number;
  onChange?: (e: string) => void;
  onClick?: () => void;
  setError?: () => void;
}

import * as React from 'react';

export interface CustomCheckboxProps {
  text: string;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  value: boolean;

  disabled?: boolean;
}

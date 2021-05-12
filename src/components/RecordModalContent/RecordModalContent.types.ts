import React from 'react';
import { Clinic, Service } from 'ducks/Misc/Misc.types';

export interface RecordModalContentProps {
  values: { services: string; place: any; clinic: any };
  currentStep: number;
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean | undefined): void;
    (arg0: string, arg1: React.ReactText): void;
  };
  setModalPlace: () => void;
  cityOptionsPlace: {
    label: string;
    value: string;
    disable?: boolean
  }[];
  clinicsOptions: Clinic[];
  optionServices: Service[];
  allOptionServices: Service[];
}

import { FormikValues } from 'formik';
import { City, Clinic, Service } from 'ducks/Misc/Misc.types';
import { RECORD_TYPE } from 'navigation/Navigation.types';

export interface RecordAuthProps {
  name: string;
  loading: boolean;
  submitRecord: (values: FormikValues) => void;
  cityOptionsPlace: {
    label: string;
    value: string;
  }[];
  clinicsOptions: Clinic[];
  optionServices: Service[];
  allOptionServices: Service[];
  type: RECORD_TYPE

  city?: City | undefined;
  servicesValue?: string;
  clinicId?: string;
  cityValue?: City;
}

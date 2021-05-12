import { City, Clinic } from 'ducks/Misc/Misc.types';

export interface ContentMapModalProps {
  setModalList: () => void
  moveCameraToLocation: (lat: number, lng: number, id: string) => void
  clinicsByCity: Clinic[]
  cities: City[]
  city: City | null,
  clinics: Clinic[],
  currentStep: number,
  selectedHandlerCity: (id: string) => void
  cityOptionsPlace: {
    value: string,
    label: string
  }[]
}

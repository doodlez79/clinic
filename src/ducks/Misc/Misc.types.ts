import { MarkDownTypes } from 'types/MarkDown';
import React from 'react';
import { LocationObject } from 'expo-location';

export interface MiscTypes {
  cities: City[];
  services: {
    allServices: Service[];
    mainServices: Service[];
    recordServices: Service[];
  };
  version: Version | null
  multiPhone: string,
  location: LocationObject | null;
  clinics: Clinic[];
  modalBody: {
    id: string,
    title: string,
    markdown: MarkDownTypes
  }[];
  themesFeedback: FeedBack[];
  loading: boolean;
  doctors: Doctor[]
}

export enum MiscTypesVersions {
  PRODUCTS = 'products',
  CLINICS = 'clinics',
  CITIES = 'cities',
  FEEDBACK_SUBJECTS = 'feedback-subjects',
  MODAL_BODIES = 'modal-bodies',
  MULTI_PHONE = 'multichannel-phone',
  DOCTORS = 'doctors'
}

export type Version = {
  [key in MiscTypesVersions]: number;
};
export interface Service {
  id: string;
  order:number,
  name: string;
  poster: string;
  markdown: MarkDownTypes;
  parentId: string | null;
  isServiceProduct: boolean;
  createdAt: Date;
  updatedAt: Date;
  clinics: string[];
  children: Service[] | null
  openDescription: boolean
  activeIcon: string
  inactiveIcon: string;
  isVisit:boolean
}
export interface ServicesWithIcon extends Service {
  icon: (color: string | undefined) => React.ReactNode | {}
}

export interface Doctor {
  id: string;
  firstName: string,
  middleName: string,
  lastName: string,
  avatar: string,
  markdown: MarkDownTypes,
  city: {
    id: string
  },
  products: string[],
  createdAt: Date,
  updatedAt: Date
}

export interface FeedBack {
  id: string;
  subject: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  email: string;
  coords: { lat: number; lng: number };
  city: {
    id: string;
    shortCityName?: string
  } | null;
  phones: [
    {
      id: string;
      phone: string;
    }
  ];
  workingHours: string;
  products: [id: string];
}

export interface City {
  id: string;
  name?: string;
  center?: { lat: number; lng: number };
  radius?: number;
}

export enum DaysOfWeek {
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
}

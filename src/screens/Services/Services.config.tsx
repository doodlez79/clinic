import React from 'react';
import CT from 'Icons/Servises/CT.svg';
import DocServices from 'Icons/Servises/Doc.svg';
import MRI from 'Icons/Servises/MRI.svg';
import Tests from 'Icons/Servises/Tests.svg';
import USI from 'Icons/Servises/US.svg';
import Other from 'Icons/Servises/Other.svg';

export const mapIconsServices = [
  {
    id: 0,
    name: 'ultrasound',
    icon: (color: string | undefined, bgColor: () => string) => <USI strokeProps={ color } fill={ bgColor() } />,
  },
  {
    id: 1,
    name: 'mrt',
    icon: (color: string | undefined, bgColor: () => string) => <MRI strokeProps={ color } fill={ bgColor() } />,
  },
  {
    id: 2,
    name: 'kt',
    icon: (color: string | undefined, bgColor: () => string) => <CT strokeProps={ color } fill={ bgColor() } />,
  },
  {
    id: 4,
    name: 'tests',
    icon: (color: string | undefined, bgColor: () => string) => <Tests strokeProps={ color } fill={ bgColor() } />,
  },
  {
    id: 5,
    name: 'visit',
    icon: (color: string | undefined, bgColor: () => string) => (
      <DocServices strokeProps={ color } fill={ bgColor() } />
    ),
  },
  {
    id: 6,
    name: 'other',
    icon: (color: string | undefined, bgColor: () => string) => <Other strokeProps={ color } fill={ bgColor() } />,
  },
];

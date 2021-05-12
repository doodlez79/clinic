import { Service } from 'ducks/Misc/Misc.types';

export const filterByChildrenClinicCity = (array: Service[], currentClinics: string[]) => {
  const helpArray = array.filter(el => el.clinics.some(item => currentClinics.includes(item))).reduce((acc, item) => {
    acc = [
      ...acc,
      {
        ...item,
        children: item.children?.filter(el => el.clinics.some(item => currentClinics.includes(item))),
      },
    ];
    return acc;
  }, [] as Service[]);
  return helpArray;
};

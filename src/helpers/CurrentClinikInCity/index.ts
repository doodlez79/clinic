import { City, Clinic } from 'ducks/Misc/Misc.types';

export const currentClinikInCity = (cliniks : Clinic[], currentCity:City | null) => {
  const helpArray = cliniks.reduce((acc, elem) => {
    if (elem.city?.id === currentCity?.id) {
      acc.push(elem.id);
    }

    return acc;
  }, [] as Clinic[]);

  return helpArray;
};

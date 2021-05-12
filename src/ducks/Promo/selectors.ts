import { StoreTypes } from 'types/store';
import { createSelector } from 'reselect';

const getPromo = (state: StoreTypes) => state.promo;

export const isLoading = createSelector(getPromo, promo => promo.loading);
export const getAllPromo = createSelector(getPromo, promo => promo.promos);
export const getPromoItem = createSelector(getPromo, promo => promo.promoItem);

export const getPromos = createSelector((state: StoreTypes) => state, (state: StoreTypes) => {
  const { clinics } = state.misc;
  const { promos } = state.promo;
  const currentCity = state.user.profile?.city?.id;

  const clinicksByCity = clinics.filter(el => el.city?.id === currentCity);

  // eslint-disable-next-line max-len
  const newPromos = promos.filter(el => el.clinics.some((item: string) => clinicksByCity.map(elem => elem?.id).includes(item)));

  const globalPromos = promos.filter(item => item.isGlobal);
  const promosByCityAndGlobalPromos = newPromos.concat(globalPromos);
  return promosByCityAndGlobalPromos;
});

export const getClinicsByPromo = createSelector((state: StoreTypes) => state, (state: StoreTypes) => {
  const { clinics } = state.misc;
  const { promoItem } = state.promo;
  const currentCity = state.user.profile?.city?.id;

  const currentClinics = clinics.map(item => item.id);

  const clinicsWithThisPromoIds = promoItem?.clinics.reduce((acc: any, item: string) => {
    if (currentClinics.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);

  const clinicsWithThisPromo = clinics?.reduce((acc, el) => {
    if (clinicsWithThisPromoIds?.includes(el?.id)) {
      acc.push(el?.name);
    }
    return acc;
  }, [] as string[]);

  const clinicsWithThisPromoInCurrentCity = clinics?.reduce((acc, item) => {
    if (item?.city?.id === currentCity) {
      if (clinicsWithThisPromo.includes(item?.name)) {
        acc.push({ name: item?.name, address: item?.address });
      }
    }
    return acc;
  }, [] as {name: string, address: string}[]);

  const clinicsWithThisPromoWithoutCity = clinics?.reduce((acc, item) => {
    if (clinicsWithThisPromo.includes(item?.name)) {
      acc.push({ name: item?.name, city: item?.city?.shortCityName, address: item?.address });
    }
    return acc;
  }, [] as {name: string, city?: string, address: string}[]);

  return { clinicsWithThisPromoInCurrentCity, clinicsWithThisPromoWithoutCity };
});

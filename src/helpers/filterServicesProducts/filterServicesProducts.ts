import { Service } from 'ducks/Misc/Misc.types';

export const filterServicesProducts = (data: Service[]) => {
  if (data.length > 0) {
    let filtersArrayByCategory = {
      mainServices: data.filter(el => !el.parentId && !el.isServiceProduct),
      secondServices: data.filter(el => el.parentId),
      recordServices: data.filter(el => !el.parentId),
    };

    filtersArrayByCategory = {
      ...filtersArrayByCategory,
      mainServices: filtersArrayByCategory.mainServices,
      recordServices: filtersArrayByCategory.recordServices.concat(data.filter(el => el.isServiceProduct)),
    };

    return {
      mainServices: filtersArrayByCategory.mainServices.reduce((acc, item) => {
        if (
          filtersArrayByCategory.secondServices.find(
            el => el.parentId === item.id,
          )
        ) {
          acc = [
            ...acc,
            {
              ...item,
              children: [
                ...(item.children || []),
                ...filtersArrayByCategory.secondServices.filter(
                  el => el.parentId === item.id,
                )!.sort((a, b) => (a.order - b.order)),
              ],
            },
          ];
        } else {
          acc = [
            ...acc,
            {
              ...item,
              children: [],
            },
          ];
        }
        return acc.sort((a, b) => (a.order > b.order ? 1 : -1));
      }, [] as Service[]),
      recordServices: filtersArrayByCategory.recordServices,
      allServices: data,
    };
  }
  return [];
};

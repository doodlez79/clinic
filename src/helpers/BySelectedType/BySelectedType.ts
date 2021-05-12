export const bySelectedType = (
  data: any[],
  key: string = 'name',
): { label: string; value: string }[] => data.map(item => ({
  label: item[key],
  value: item.id,
  props: item,
}));

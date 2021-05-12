type Fn = (arg: any) => any;
type PickLastInTuple<T extends any[]> = T extends [...rest: infer _, argn: infer L ] ? L : never;
type FirstFnParameterType<T extends any[]> = Parameters<PickLastInTuple<T>>[any];
type LastFnReturnType<T extends any[]> = ReturnType<T[0]>;

// eslint-disable-next-line
export const compose = <T extends Fn[]>(...fns: T) => {
  return (x: FirstFnParameterType<T>): LastFnReturnType<T> => fns.reduceRight((acc: any, fn: any) => fn(acc), x);
};

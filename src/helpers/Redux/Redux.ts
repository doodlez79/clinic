export const generateAsyncActions = (prefix: string) => ({
  REQUEST: `${prefix}/REQUEST`,
  SUCCESSED: `${prefix}/SUCCESSED`,
  FAILED: `${prefix}/FAILED`,
});

import { createActionCreator } from 'deox';

export const actionReset = createActionCreator(
  'RESET',
  resolve => (payload?: boolean) => resolve(payload),
);

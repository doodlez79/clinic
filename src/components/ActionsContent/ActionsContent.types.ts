export enum TYPE_ACTION_CONTENT {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  ARCHIVE = 'ARCHIVE',
}
export interface ActionsContentProps {
  type: TYPE_ACTION_CONTENT;
  update: () => void;
  loading: boolean;
}

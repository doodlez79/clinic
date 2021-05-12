import { TYPE_HISTORY } from 'ducks/Bonuses/Bonuses.types';

export interface BalanceHistoryItemProps {
  type: TYPE_HISTORY;
  text: string;
  date: string;
  count: number
  isCancelled: boolean
  inHold: boolean

  dateEnroll?: string | null
  availableDate?: boolean
}

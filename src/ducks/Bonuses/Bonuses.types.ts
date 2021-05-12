export interface BonusesStateType {
  loading: boolean;
  error: any;
  data: BonusesDataType
}

export interface BonusesDataType {
  total: number,
  inHold: number,
  available: number,
  history: HistoryType[]
}

export interface HistoryType {
  id: string;
  amount: number
  type: TYPE_HISTORY
  depositAfter: Date | null
  inHold: boolean
  description: string
  isCancelled: boolean
  createdAt: Date | null
  updatedAt: string
}

export enum TYPE_HISTORY {
  WITHDRAW = 'WITHDRAW',
  DEPOSIT ='DEPOSIT',

}

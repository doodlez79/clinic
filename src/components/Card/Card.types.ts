export interface CardProps {
  openAuthRout: () => void;
  openHistoryBalanceRout: () => void;
  totalBonuses: number
  availableBonuses: number
  cardNumber: string | null
}

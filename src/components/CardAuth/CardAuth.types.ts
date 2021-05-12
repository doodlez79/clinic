export interface CardAuthProps {
  countBall: number;
  availableBonuses: number;
  numberCard: string | null;

  onOpenModal: () => void;
  onShowCard: () => void;
  onPressHistory: () => void;
}

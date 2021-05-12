export interface OnBoardingFooterContentProps {
  title: string;
  text: string;
  textBtn: string;
  currentScreen: number;
  onPress: () => void;
  linkPress: () => void;

  linkText?: string;
}

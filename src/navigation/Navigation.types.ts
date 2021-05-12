export type MainStackParamList = {
  About: undefined
  Auth: undefined
  AuthPhone: undefined
  AuthName: undefined
  AuthCode: undefined
  Main: undefined
  Home: undefined
  FirstScreen: undefined
  SecondScreen: undefined
  ThirdScreen: undefined
  WelcomeScreen: undefined
  Notifications: undefined
  Map: undefined
  Balance: undefined
  Develop: undefined
  FeedbackSuccess: undefined
  Profile: undefined
  Services: {
    id: string

  }
  Feedback: undefined
  ['News/Detail']: {
    id: string,
    green: boolean
  },
  ['Detail/Promo']: {
    id: string,
    green: boolean
  },
  ['Detail/Services']: {
    id: string,
    isVisit: boolean
  },
  News: undefined,
  Promo: undefined,
  Record: {
    servicesId?: string;
    clinicId?: string;
    type: RECORD_TYPE
  }
  RecordSuccess: undefined
}

export enum RECORD_TYPE {
  CLINIC='CLINIC',
  SERVICE='SERVICE',
  DEFAULT='DEFAULT'
}

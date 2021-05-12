import { generateAsyncActions } from 'helpers/Redux/Redux';
import { createActionCreator } from 'deox';
import { BonusesDataType } from 'ducks/Bonuses/Bonuses.types';

const rootPrefix = '@Notifications';

/** CheckBonuses */
const prefixCheckBonuses = `${rootPrefix}/CHECK_BONUS`;
const checkBonusesActionTypes = generateAsyncActions(prefixCheckBonuses);

export interface CheckBonusAction {
  type: typeof checkBonusesActionTypes.REQUEST;
  payload: number;
}

export interface CheckBonusSuccessedAction {
  type: typeof checkBonusesActionTypes.SUCCESSED;
  payload: BonusesDataType
}

export interface CheckBonusFailedAction {
  type: typeof checkBonusesActionTypes.FAILED;
  payload: string;
}

const checkBonuses = {
  request: createActionCreator(
    checkBonusesActionTypes.REQUEST,
    resolve => (payload: CheckBonusAction['payload']) => resolve(payload),
  ),
  successed: createActionCreator(
    checkBonusesActionTypes.SUCCESSED,
    resolve => (payload: CheckBonusSuccessedAction['payload']) => resolve(payload),
  ),
  failed: createActionCreator(
    checkBonusesActionTypes.FAILED,
  ),
};

export {
  checkBonuses,
};

import { ApiServices } from 'services/Api';
import { HistoryType } from 'ducks/Bonuses/Bonuses.types';
import { parseISO } from 'date-fns';

export default class Bonuses {
  APIService: ApiServices;

  constructor(APIService: ApiServices) {
    this.APIService = APIService;
  }

  checkBonuses(count: number) {
    return this.APIService.get('/bonus', { history: count }).then(res => ({
      ...res,
      history: this.mapEntities(res.history),
    }));
  }

  mapEntity(
    promo: Omit<HistoryType, 'createdAt' | 'depositAfter'>&{createdAt: string | null, depositAfter: string | null},
  ) {
    return {
      ...promo,
      createdAt: promo.createdAt ? parseISO(promo.createdAt) : null,
      depositAfter: promo.depositAfter ? parseISO(promo.depositAfter) : null,
    };
  }

  mapEntities(
    // eslint-disable-next-line max-len
    promos: Array< Omit<HistoryType, 'createdAt'| 'depositAfter'>&{createdAt: string | null, depositAfter: string | null}>,
  ) {
    return promos.map(this.mapEntity);
  }
}

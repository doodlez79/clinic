import { ApiServices } from 'services/Api';
import { PromoType } from 'ducks/Promo/Promo.types';
import { parseISO } from 'date-fns';

export default class PromoService {
  APIService: ApiServices;

  constructor(APIService: ApiServices) {
    this.APIService = APIService;
  }

  getPromos() {
    return this.APIService.get('/promotion/list').then(res => this.mapEntities(res.result));
  }

  getPromoItem(id: string) {
    return this.APIService.get(`/promotion/${id}`).then(this.mapEntity);
  }

  mapEntity(promo: Omit<PromoType, 'endAt' | 'startAt'>&{endAt: string | null, startAt: string | null}) {
    return {
      ...promo,
      endAt: promo.endAt ? parseISO(promo.endAt) : null,
      startAt: promo.startAt ? parseISO(promo.startAt) : null,
    };
  }

  mapEntities(promos: Array< Omit<PromoType, 'endAt' | 'startAt'>&{endAt: string | null, startAt: string | null}>) {
    return promos.map(this.mapEntity);
  }
}

import { ApiServices } from 'services/Api';
import { NewsItemsMeta, NewsItemType } from 'ducks/News/News.types';
import { parseISO } from 'date-fns';

export default class News {
  APIService: ApiServices;

  constructor(APIService: ApiServices) {
    this.APIService = APIService;
  }

  getNews(meta: NewsItemsMeta) {
    return this.APIService.get('/post/list', { ...meta }).then(res => ({
      ...res,
      result: this.mapEntities(res.result),
    }));
  }

  getNewsItem(id: NewsItemType) {
    return this.APIService.get(`/post/${id}`).then(res => this.mapEntity(res));
  }

  mapEntity(newsItem: Omit<NewsItemType, 'publicationDate'> & {publicationDate: string | null}) {
    return {
      ...newsItem,
      publicationDate: newsItem.publicationDate ? parseISO(newsItem.publicationDate) : null,

    };
  }

  mapEntities(promos: Array< Omit<NewsItemType, 'publicationDate'>&{publicationDate: string | null}>) {
    return promos.map(this.mapEntity);
  }
}

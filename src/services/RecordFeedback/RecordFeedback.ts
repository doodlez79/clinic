import { ApiServices } from 'services/Api';

export default class RecordFeedbackService {
  APIService: ApiServices;

  constructor(APIService: ApiServices) {
    this.APIService = APIService;
  }

  sendRecord(data: any) {
    return this.APIService.post('/claim/backcall', { ...data });
  }

  sendFeedback(data: any) {
    return this.APIService.post('/claim/feedback', { ...data });
  }
}

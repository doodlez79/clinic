import { ApiServices } from 'services/Api';

export default class MiscService {
  APIService: ApiServices;

  constructor(APIService: ApiServices) {
    this.APIService = APIService;
  }

  getCities() {
    return this.APIService.get('/misc/cities');
  }

  getClinics() {
    return this.APIService.get('/misc/clinics');
  }

  getFeedbackThemes() {
    return this.APIService.get('/misc/feedback-subjects');
  }

  checkVersion() {
    return this.APIService.get('/misc/versions');
  }

  getServices() {
    return this.APIService.get('/misc/products');
  }

  getMultiPhone() {
    return this.APIService.get('/misc/multichannel-phone');
  }

  getModalBody() {
    return this.APIService.get('/misc/modal-bodies');
  }

  getDoctorsList() {
    return this.APIService.get('/misc/doctors');
  }
}

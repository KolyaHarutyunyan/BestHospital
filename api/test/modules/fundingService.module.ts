import axios from 'axios';
import { BASE_URL } from '../data';

export class FundingServiceModule {
  static async createFundingService(fundingService, fundingId, globServiceId) {
    fundingService.serviceId = globServiceId;
    const res = await axios.post(
      BASE_URL + `funding/${fundingId}/service`,
      fundingService,
    );
    return res.data;
  }
  static async editFundingService(fundingService, serviceId, globServiceId) {
    fundingService.globServiceId = globServiceId;
    const res = await axios.patch(
      BASE_URL + `funding/service/${serviceId}`,
      fundingService,
    );
    return res.data;
  }
}

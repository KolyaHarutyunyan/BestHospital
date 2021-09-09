import axios from 'axios';
import { Util } from '../util';

export class FundingModule {
  static async createFunding(funding) {
    try {
      const res = await axios.post(Util.makePath('funding'), funding);
      console.log('Funding Source created --- ' + res.data.id);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('createFunding');
    }
  }
  static async editFunding(funding, fundingId) {
    try {
      const res = await axios.patch(Util.makePath(`funding/${fundingId}`), funding);
      console.log('Funding Source updated --- ' + res.data.id);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('editFunding');
    }
  }
  static async createFundingService(fundingService, fundingId, globServiceId) {
    try {  
      fundingService.serviceId = globServiceId
      const res = await axios.post(Util.makePath(`funding/${fundingId}/service`), fundingService);
      console.log('Funding Source Service created --- ' + res.data._id);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('createFundingService');
    }
  }
  static async editFundingService(fundingService, serviceId) {
    try {  
      const res = await axios.patch(Util.makePath(`funding/service/${serviceId}`), fundingService);
      console.log('Funding Source updated --- ' + res.data.id);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('editFundingService');
    }
  }
  
}

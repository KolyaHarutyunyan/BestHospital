import axios from 'axios';
import { Util } from '../util';

export class FundingModule {
  static async createFunding(funding) {
    try {
      const res = await axios.post(Util.makePath('funding'), funding);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('createFunding');
    }
  }
  static async editFunding(funding, fundingId) {
    try {
      const res = await axios.patch(Util.makePath(`funding/${fundingId}`), funding);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('editFunding');
    }
  }
}

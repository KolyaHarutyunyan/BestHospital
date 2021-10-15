import axios from 'axios';
import { BASE_URL } from '../data';

export class OvertimeModule {
  static async createOvertime(overtime) {
    const res = await axios.post(BASE_URL + 'overtime', overtime);
    return res.data;
  }
  static async editFunding(funding, fundingId) {
    const res = await axios.patch(BASE_URL + `funding/${fundingId}`, funding);
    return res.data;
  }

  static async deleteFunding(fundingId) {
    const res = await axios.delete(BASE_URL + `funding/${fundingId}`);
    return res.data;
  }
}

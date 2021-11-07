import axios from 'axios';
import { BASE_URL } from '../data';

export class EmploymentModule {
  static async createEmployment(employment) {
    console.log(employment, 'employmennnnnnnnnnnnnnnnnnnnnnnnnnnt')
    const res = await axios.post(BASE_URL + 'employment', employment);
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

import axios from 'axios';
import { BASE_URL } from '../data';

export class TimesheetModule {
  static async createTimesheet(timesheet) {
    const res = await axios.post(BASE_URL + 'timesheet', timesheet);
    return res.data;
  }
  static async editTimesheet(funding, fundingId) {
    const res = await axios.patch(BASE_URL + `funding/${fundingId}`, funding);
    return res.data;
  }

  static async deleteFunding(fundingId) {
    const res = await axios.delete(BASE_URL + `funding/${fundingId}`);
    return res.data;
  }
}

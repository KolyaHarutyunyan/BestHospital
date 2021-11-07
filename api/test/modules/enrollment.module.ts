import axios from 'axios';
import { BASE_URL } from '../data';

export class EnrollmentModule {
  static async createEnrollment(enrollment) {
    console.log(enrollment, 'enrollmenttttttttttttttttt')
    const res = await axios.post(BASE_URL + `enrollment/client/${enrollment.clientId}/funder/${enrollment.funderId}`, enrollment);
    return res.data;
  }
  static async editEnrollment(funding, fundingId) {
    const res = await axios.patch(BASE_URL + `funding/${fundingId}`, funding);
    return res.data;
  }

  static async deleteEnrollment(fundingId) {
    const res = await axios.delete(BASE_URL + `funding/${fundingId}`);
    return res.data;
  }
}

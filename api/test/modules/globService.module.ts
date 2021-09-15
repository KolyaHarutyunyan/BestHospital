import axios from 'axios';
import { BASE_URL } from '../data';

export class GlobalServiceModule {
  static async createGlobalService(service) {
    const res = await axios.post(BASE_URL + 'service', service);
    return res.data;
  }
}

import axios from 'axios';
import { BASE_URL } from '../data';

export class ModifierModule {
  static async createModifiers(modifier, serviceId, credential) {
    modifier.map((modify) => (modify.credentialId = credential));
    modifier.serviceId = serviceId;
    const res = await axios.post(BASE_URL + 'modifier', modifier);
    return res.data;
  }
}

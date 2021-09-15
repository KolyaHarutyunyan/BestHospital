import axios from 'axios';
import { BASE_URL } from '../data';

export class CredentialModule {
  static async createCredential(credential) {
    const res = await axios.post(BASE_URL + 'credential', credential);
    return res.data;
  }
}

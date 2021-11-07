import axios from 'axios';
import { BASE_URL } from '../data';

export class ClientModule {
  static async createClient(client) {
    const res = await axios.post(BASE_URL + 'client', client);
    return res.data;
  }
  static async editClient(client, id) {
    const res = await axios.patch(BASE_URL + `client/${id}`, client);
    return res.data;
  }
}

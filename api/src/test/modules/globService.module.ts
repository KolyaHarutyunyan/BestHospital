import axios from 'axios';
import { Util } from '../util';

export class GlobalServiceModule {
  static async createGlobalService(service) {
    try {
      const res = await axios.post(Util.makePath('service'), service);
      console.log('Global Service created --- ' + res.data.id);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('createGlobalService');
    }
  }
}

import axios from 'axios';
import { Util } from '../util';

export class ModifierModule {
  static async createModifiers(modifier, serviceId, credential) {
    try {
      modifier.serviceId = serviceId;
      console.log(modifier);
      console.log(serviceId, 'serviceId');
      console.log(credential, 'credential');
      const res = await axios.post(Util.makePath('modifier'), modifier);
      console.log('Modifier created --- ' + res.data.id);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('createModifier');
    }
  }
}

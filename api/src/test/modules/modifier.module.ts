import axios from 'axios';
import { Util } from '../util';

export class ModifierModule {
  static async createModifiers(modifier) {
    try {
      const res = await axios.post(Util.makePath('modifier'), modifier);
      console.log('Modifier created --- ' + res.data.id);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('createModifier');
    }
  }
}

import axios from 'axios';
import { Util } from '../util';

export class CredentialModule {
  static async createCredential(credential) {
    try {
      const res = await axios.post(Util.makePath('credential'), credential);
      console.log('Credential created --- ' + res.data.name);
      return res.data;
    } catch (err) {
      console.log(err.message);
      Util.showError('createCredential');
    }
  }
}

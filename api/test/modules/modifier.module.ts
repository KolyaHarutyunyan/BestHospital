import axios from 'axios';
import { BASE_URL } from '../data';

export class ModifierModule {
  static async createModifiers(modifiers) {
   
    console.log(modifiers, 'modifieeeeeeeeeeeeeerr')
    const res = await axios.post(BASE_URL + 'modifier', modifiers);
    return res.data;
  }
}

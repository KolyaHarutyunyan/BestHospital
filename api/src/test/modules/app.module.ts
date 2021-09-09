import { Util } from '../util';
import axios from 'axios';

export class AppModule {
  static async clearDB() {
    // Whipe the database
    try {
      await axios.get(Util.makePath('dropDatabase'));
      console.log('Database Cleared');
    } catch (err) {
      Util.showError('Drop Database');
    }
  }
}
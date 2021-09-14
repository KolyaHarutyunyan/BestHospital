import axios from 'axios';
import { BASE_URL } from '../data';

export class App {
  static async clearDB() {
    // Whipe the database
    await axios.get(BASE_URL + 'dropDatabase');
  }
}

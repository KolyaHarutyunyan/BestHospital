const URL = 'http://localhost:8200/api';

export class Util {
  static makePath(path) {
    return `${URL}/${path}`;
  }
  static showError(message) {
    console.log('Error in ' + message);
  }
}

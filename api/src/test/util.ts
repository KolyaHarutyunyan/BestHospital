const URL = 'http://localhost:8200/api';

export class Util {
  static makePath(path) {
    return `${URL}/${path}`;
  }
  static showError(message) {
    console.log('Error in ' + message);
  }

  static async runTest(test) {
    // Setup
    const name = '\u001b[' + 36 + 'm' + test.name + '\u001b[0m';
    console.group('Starting the test:::::::' + name);
    console.group();
    // try running test function
    let isPassing = false;
    try {
      isPassing = await test();
    } catch (e) {
      console.log(e.message);
      isPassing = false;
    }
    const passString = '\u001b[' + 92 + 'm' + 'Passing \u2705' + '\u001b[0m';
    const failString = '\u001b[' + 31 + 'm' + 'Failed \u274c' + '\u001b[0m';
    const resultString = '\u001b[' + 93 + 'm' + 'Result ------------------ ' + '\u001b[0m';
    let result = failString;
    if (isPassing) result = passString;
    console.groupEnd();
    console.log(resultString + result);
    console.groupEnd();
    // console.log('Ending the test:::::::' + name);
    console.log();
  }
}

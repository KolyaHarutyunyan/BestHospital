const dbs = {
  DEV: 'nest-test',
  TEST_H: 'TEST_H',
  TEST_E: 'TEST_E',
};
const DB = dbs.DEV;

export const MONGO_CONN_STR = `mongodb+srv://wellnessdaisy-mongo:!WELEachbase1!@testing.ykcxo.mongodb.net/${DB}?retryWrites=true&w=majority`;
export const port = 8200;

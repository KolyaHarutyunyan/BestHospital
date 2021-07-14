export const COMPANY_EMAIL = 'eachbase@gmail.com';
export const MONGO_DUPLICATE_KEY = 11000;

const mode = ['local', 'development', 'production'][0];
export const BASE_URL = {
  local: 'http://localhost:8081/api',
  development: 'https://armat.eachbase.com/api',
  production: 'https://armat.org',
}[mode];

export const DOMAIN_NAME = {
  local: 'http://localhost:3000',
  development: 'https://armat.eachbase.com/socialLogin/',
  production: 'https://armat.org/socialLogin',
}[mode];

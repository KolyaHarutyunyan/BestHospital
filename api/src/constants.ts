export const COMPANY_EMAIL = 'eachbase@gmail.com';
export const MONGO_DUPLICATE_KEY = 11000;

const mode = ['local', 'development', 'production'][1];
export const BASE_URL = {
  local: 'http://localhost:8081/api',
  development: 'https://wellnessdaisy.eachbase.com/api',
  production: 'https://wellnessdaisy.com',
}[mode];



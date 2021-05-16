export const COMPANY_EMAIL = 'eachbase@gmail.com';

const mode = ['local', 'development', 'production'][0];
export const BASE_URL = {
  local: 'http://localhost:8081/api',
  development: 'https://wellnessdaisy.eachbase.com/api',
  production: 'https://wellnessdaisy.com',
}[mode];

export const DOMAIN_NAME = {
  local: 'http://localhost:3000',
  development: 'https://armat.eachbase.com/socialLogin/',
  production: 'https://armat.org/socialLogin',
}[mode];

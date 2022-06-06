const mode = ['local', 'development', 'production'][1];
let apiBase;
switch (mode) {
    case 'local':
        apiBase = 'http://localhost:8200/api';
        break;
    case 'development':
        apiBase = 'https://wellnessdaisy.eachbase.com/api';
        break;
    case 'production':
        apiBase = 'https://wellnessdaisy.com/api';
        break;
    default:
        break;
}

export const API_BASE = apiBase;

const token = localStorage.getItem('access-token')

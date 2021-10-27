import axios from 'axios';

const local = localStorage.getItem("Reset") ? localStorage.getItem("Reset") : ''

export const initAxiosInterceptors = () => {
    // if(!local) {
        axios.interceptors.request.use((config) => {
            // config.url = `http://localhost:8200/api${config.url}`;
            config.url = `https://wellnessdaisy.eachbase.com/api${config.url}`;
            if (config.auth) {
                const token = localStorage.getItem('access-token');
                if (!token) {
                    // window.location.replace('/')
                    // router.push('/');
                    throw new Error('token not found');
                }
                config.headers = {
                    ...config.headers,
                    'access-token': `${token}`,
                };
            }
            return config;
        });

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem('access-token');
                    // window.location.replace('/')
                    // router.push('/');
                }
                throw new Object({
                    data: error.response.data,
                    status: error.response.status,
                });
            }
        );
    // }
};

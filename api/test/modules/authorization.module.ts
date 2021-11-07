import axios from 'axios';
import { BASE_URL } from '../data';

export class AuthorizationModule {
    static async createAuthorization(authorization) {

        console.log(authorization,' authorizationnnnnnnnnnnnnnnnn')

        const res = await axios.post(BASE_URL + `authorization/client/${authorization.clientId}/funder/${authorization.funderId}`, authorization);
        return res.data;
    }
    static async editAuthorization(authorization, id) {
        const res = await axios.patch(BASE_URL + `authorization/${id}`, authorization);
        return res.data;
    }
}

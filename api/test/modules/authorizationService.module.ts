import axios from 'axios';
import { BASE_URL } from '../data';

export class AuthorizationServiceModule {
    static async createAuthorizationService(authService) {
        console.log(authService, 'authServiceeeeeeeeeeeeeeeeeeeeee');
        const res = await axios.post(BASE_URL + `authorizationservice/authorization/${authService.authorizationId}/fundingService/${authService.fundingServiceId}`, authService);
        return res.data;
    }
    static async editAuthorizationService(authService, id) {
        const res = await axios.patch(BASE_URL + `authorizationservice/${id}`, authService);
        return res.data;
    }
}

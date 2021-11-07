import axios from 'axios';
import { BASE_URL } from '../data';

export class PayCodeModule {
    static async createPayCode(payCode) {
        console.log(payCode, 'payCodepayCodepayCode')
        const res = await axios.post(BASE_URL + 'paycode', payCode);
        return res.data;
    }
    static async editFunding(funding, fundingId) {
        const res = await axios.patch(BASE_URL + `funding/${fundingId}`, funding);
        return res.data;
    }

    static async deleteFunding(fundingId) {
        const res = await axios.delete(BASE_URL + `funding/${fundingId}`);
        return res.data;
    }
}

import { API_BASE } from '../constants';
import axios from "axios";

const path = `${API_BASE}`;
const token = localStorage.getItem('access-token')

export const authService = {

    signIn: (body) => axios.post('/authn/signin', body),

    logOut: () => axios.post( `/authn/logout`, {},{ auth:true }),

    getLink: (email) => axios.get(`/auth/forgotPassword/${email}` ),

    resetPass: (passwords) => {
        let endpoint = `${path}/auth/resetPassword`;
        const res = axios.post(endpoint,

          {
            "newPassword": passwords.newPassword,
            "confirmation": passwords.confirmation
        },
        { headers: { 'reset-token': passwords.token } },
        );
        return res;
    },

    changePasswordService: (data)=> axios.post('/authn/changePassword', data, {auth:true}),

    checkUser :(id)=> axios.get(`/authn/${id}`)

};

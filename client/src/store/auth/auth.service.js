import { API_BASE } from '../constants';
import axios from "axios";

export const authService = {

    signIn: (body) => axios.post('/authn/signin', body),


    logOut: () => axios.post( `/authn/logout`, {},),

    getLink: (email) => axios.get(`/authn/forgotPassword/${email}` ),

    confirmAccount : (passwords) =>{
        const res = axios.post(`/authn`,

            {
                "newPassword": passwords.newPassword,
                "confirmation": passwords.confirmation
            },
            { headers: { 'registration-token': passwords.token } },
        );
        return res;
    },

    resetPass: (passwords) => {
        let endpoint = `/authn/resetPassword`;
        const res = axios.post(endpoint,
          {
            "newPassword": passwords.newPassword,
            "confirmation": passwords.confirmation
        },
        { headers: { 'reset-token': passwords.token } },
        );
        return res;
    },

    changePasswordService: (data)=> axios.post('/authn/changePassword', data, ),

    muAuthnService :()=> axios.get(`/authn/myAuth`,{auth:true}  ),

    myProfileService :(type)=>  axios.get(
        type === 'ADMIN' ? `/admins/myProfile` :
            type === 'AGENT' && `/agents/myProfile`, {auth:true}  ),

    /** Access service */
    getAccessService :(id) => axios.get(`/authn/${id}`, {auth:true} ),

    addAccessService :(userId, roleId) => axios.patch(`/authn/${userId}/${roleId}/addRole`, null, {auth:true} ),

    removeAccessService :(userId, roleId) => axios.patch(`/authn/${userId}/${roleId}/removeRole`, null,{auth:true} )
    /** End */
};

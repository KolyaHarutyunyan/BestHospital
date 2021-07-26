// import { API_BASE } from '../constants';
import axios from "axios";

// const path = `${API_BASE}`;
// const token = localStorage.getItem('access-token')
// const header = { headers: { 'access-token': token } }

export const authService = {

  createAdminService: ( body ) => axios.post(`/admins`, body),

  getAdminsService: ( ) => axios.get('/admins' ),

  getAdminByIdService: ( id ) => axios.get(`/admins/${id}`, ),

  activateAdminService:( id ) => axios.patch(`/authn/${id.id}/activate`, ),

  inactivateAdminService:( id ) => axios.patch(`/authn/${id.id}/inactivate` ),


};

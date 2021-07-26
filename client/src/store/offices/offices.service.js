import axios from "axios";

export const authService = {
  createOfficeService: ( body ) => axios.post('/offices', body),

  editOfficeService: ( body ) => {
    const data ={
      "name": body.name,
      "email": body.email,
      "phoneNumber": body.phoneNumber, 
      "address": body.address ,
    }
    return axios.patch(`/offices/${body.officeId}`, data);
  },

  getOfficesService: ( ) => axios.get('/offices' ),

  getOfficeByIdService: ( id ) => axios.get(`/offices/${id}`),

  activateOfficeService: ( id ) => axios.patch(`/offices/${id}/activate`),

  inactivateOfficeService: ( id ) => axios.patch(`/offices/${id}/inactivate`),


};

import axios from "axios";

const body ={
  "title": "New TiT",
  "description": "text",
  "code": 1
}

export const authService = {

  createPermissionService: (  ) => axios.post(`/authz/permissions`, body, {auth:true}),

  getPermissionsService: ( ) => axios.get(`/authz/permissions`, {auth:true}),

  deletePermission: ( id ) =>  axios.delete(`/authz/permissions/${id}`, {auth:true})

};

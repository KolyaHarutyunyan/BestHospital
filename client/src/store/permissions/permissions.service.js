import axios from "axios";

const body ={
  "title": "New TiT",
  "description": "text",
  "code": 1
}

export const authService = {

  createPermissionService: (  ) => axios.post(`/authz/permissions`, body),

  getPermissionsService: ( ) => axios.get(`/authz/permissions`),

  deletePermission: ( id ) =>  axios.delete(`/authz/permissions/${id}`)

};

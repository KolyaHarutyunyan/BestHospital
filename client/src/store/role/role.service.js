import axios from "axios";

export const authService = {

  createRoleService: ( body ) => axios.post(`/authz/roles`, body, {auth:true}),

  getRoleService: ( ) =>  axios.get('/authz/roles', {auth:true}),

  deleteRoleService: ( id ) => axios.delete(`/authz/roles/${id}`, {auth:true}),

  getRoleByIdService: ( roleId ) => axios.get(`/authz/roles/${roleId}`, {auth:true}),


  addRolePermissionService: (body)=>{
    return  axios.patch(`/authz/roles/${body.roleId}/addPermissions`,
      {permissions : [body.permissionId]}, {auth:true}
    );
  },

  deleteRolePermissionService: ( data )=>{
    return axios.patch(`/authz/roles/${data.roleId}/removePermissions`,
    {permissions : [data.permissionId]}, {auth:true}
    );
  }

};

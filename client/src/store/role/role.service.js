import axios from "axios";

export const authService = {

  createRoleService: ( body ) => axios.post(`/authz/roles`, body, ),

  getRoleService: ( ) =>  axios.get('/authz/roles', ),

  deleteRoleService: ( id ) => axios.delete(`/authz/roles/${id}`, ),

  getRoleByIdService: ( roleId ) => axios.get(`/authz/roles/${roleId}`, ),


  addRolePermissionService: (body)=>{
    return  axios.patch(`/authz/roles/${body.roleId}/addPermissions`,
      {permissions : [body.permissionId]},
    );
  },

  deleteRolePermissionService: ( data )=>{
    return axios.patch(`/authz/roles/${data.roleId}/removePermissions`,
    {permissions : [data.permissionId]},
    );
  }

};

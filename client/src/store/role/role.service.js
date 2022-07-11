import axios from "axios";

export const authService = {
   createRoleService: (body) => axios.post(`/authz/roles`, body, { auth: true }),

   getRoleService: (data) => {
      // if (data) {
      //    return axios.get(`/authz/roles/?limit=${data.limit}&&skip=${data.skip}`, {
      //       auth: true,
      //    });
      // }
      return axios.get("/authz/roles", { auth: true, params:{ ...data} });
   },

   deleteRoleService: (id) => axios.delete(`/authz/roles/${id}`, { auth: true }),

   getRoleByIdService: (roleId) => axios.get(`/authz/roles/${roleId}`, { auth: true }),

   addRolePermissionService: (body) => {
      return axios.patch(
         `/authz/roles/${body.roleId}/addPermissions`,
         { permissions: [body.permissionId] },
         { auth: true }
      );
   },

   deleteRolePermissionService: (data) => {
      return axios.patch(
         `/authz/roles/${data.roleId}/removePermissions`,
         { permissions: [data.permissionId] },
         { auth: true }
      );
   },
};

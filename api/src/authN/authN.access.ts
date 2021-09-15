import { PermissionList } from 'src/authZ';

export const access = {
  ADD_ROLE: [PermissionList.MANAGE_ADMINS.code],
  GET_AUTH: [PermissionList.MANAGE_ADMINS.code],
};

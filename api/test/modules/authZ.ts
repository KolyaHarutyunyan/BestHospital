import axios from 'axios';
import { BASE_URL } from '../data';
// import { RoleDTO } from '../../src/authZ';

export class AuthZ {
  static async loadPermissions(permissions) {
    const res = await axios.post(BASE_URL + 'authZ/permissions', permissions);
    return res.data;
  }
  static async createRole(role, permissions) {
    for (let i = 0; i < permissions.length; i++) {
      role.permissions.push(permissions[i].id);
    }
    const res = await axios.post(BASE_URL + 'authz/roles', role);
    return res.data;
  }

  static async getPermissisons() {
    const res = await axios.get(BASE_URL + 'authz/permissions');
    return res.data;
  }
}

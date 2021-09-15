import axios from 'axios';
import { AuthDTO, AuthResponseDTO } from '../../src/authN/dto';
import { BASE_URL } from '../data';

export class Auth {
  static async login(admin): Promise<AuthDTO> {
    const res = await axios.post(BASE_URL + 'authn/signin', {
      email: admin.email,
      password: admin.password,
    });
    return res.data;
  }

  static async addRole(authId, roleId): Promise<AuthResponseDTO> {
    const res = await axios.patch(BASE_URL + `authn/${authId}/${roleId}/addRole`);
    return res.data;
  }

  static async getAuth(token, authId): Promise<AuthResponseDTO> {
    const res = await axios.get(BASE_URL + `authn/${authId}`, {
      headers: { 'access-token': token },
    });
    return res.data;
  }

  static async getMyAuth(token): Promise<AuthResponseDTO> {
    const res = await axios.get(BASE_URL + `authn/myAuth`, {
      headers: { 'access-token': token },
    });
    return res.data;
  }
}

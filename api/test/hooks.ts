import axios from 'axios';
import { BASE_URL, data } from './data';
import { App } from './modules';

export const mochaHooks = {
  //   async beforeEach() {
  //     // console.log('Running before each');
  //     // const response = await axios.get(`${BASE_URL}/dropDatabase`);
  //     // expect(response.status).equal(200);
  //     const response = await axios.post(`${BASE_URL}/authz/permissions`, data.permissions);
  //   },
  async beforeAll() {
    await App.clearDB();
    // const permissions = await AuthZ.loadPermissions(data.permissions);
    // const superAdmin = await Admin.createAdmin(data.admins.SUPER_ADMIN);
    // const superAdminRole = await AuthZ.createRole(data.roles.SUPER_ADMIN, permissions);
    // await Auth.addRole(superAdmin.id, superAdminRole.id);
  },
};

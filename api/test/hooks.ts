import { Auth, StaffModule } from './modules';
import { data } from './data';
import { App, AuthZ } from './modules';

export let masterStaff;
export let permissions;

export const mochaHooks = {
  async beforeAll() {
    this.timeout(0);
    await App.clearDB();
    permissions = await AuthZ.loadPermissions(data.permissions);
    masterStaff = await StaffModule.createStaff(data.staff[0]);
    const superAdminRole = await AuthZ.createRole(data.roles.SUPER_ADMIN, permissions);
    await Auth.addRole(masterStaff.id, superAdminRole.id);
  },
};

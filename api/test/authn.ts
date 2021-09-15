import { expect } from 'chai';
import { StaffModule, Auth, AuthZ } from './modules';
import { data } from './data';
import { permissions, masterStaff } from './hooks';
import { HttpStatus } from '@nestjs/common';

describe('AuthN', () => {
  describe('Login', () => {
    it('should not login', async () => {
      try {
        const auth = await Auth.login(data.staff[1]);
        expect(auth).undefined;
      } catch (error) {
        expect(error.response.status).equal(404);
      }
    });
    it('should login the user', async () => {
      const auth = await Auth.login(data.staff[0]);
      expect(auth.token).to.be.a('string');
    });
  });

  describe('GET Authn', function () {
    it('should get the user AuthN', async function () {
      const { token } = await Auth.login(data.staff[0]);
      const authN = await Auth.getAuth(token, masterStaff.id);
      expect(authN.email).to.equal(data.staff[0].email);
    });
    it('Should not get Auth', async function () {
      try {
        const admin = await StaffModule.createStaff(data.staff[1]);
        const role = await AuthZ.createRole(data.roles.MANAGE_AGENTS, [permissions[3]]);
        await Auth.addRole(admin.id, role.id);
        const { token } = await Auth.login(data.staff[1]);
        const authN = await Auth.getAuth(token, masterStaff.id);
        expect(authN.email).not.to.equal(data.staff[0].email);
      } catch (e) {
        expect(e.response?.status).to.equal(HttpStatus.UNAUTHORIZED);
      }
    });
  });

  describe('GET myAuthN', function () {
    it('Should get myAuth', async function () {
      const { token } = await Auth.login(data.staff[0]);
      const authN = await Auth.getMyAuth(token);
      expect(authN.email).to.equal(data.staff[0].email);
    });
  });
});

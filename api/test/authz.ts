import axios from 'axios';
import { expect } from 'chai';
import { BASE_URL, data } from './data';
import { AuthZ } from './modules';

describe('AuthZ', async () => {
  describe('Get Permissions', () => {
    it('should return permissions', async () => {
      const permissions = await AuthZ.getPermissisons();
      expect(permissions).to.be.a('array');
      expect(permissions).to.have.length(data.permissions.length);
    });
  });
});

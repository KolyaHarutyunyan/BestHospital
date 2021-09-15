import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { GlobalServiceModule } from './modules';

describe('Global Service', function () {
  describe('Create a Global Service', function () {
    it('Should create a service', async function () {
      const service = await GlobalServiceModule.createGlobalService(data.globalService[0]);
      expect(service.name).to.be.a('string');
      expect(service.displayCode).to.be.a('string');
      expect(service.category).to.be.a('string');
      expect(service.name).to.equal(data.globalService[0].name);
    });
    it('Should NOT create a service without name', async function () {
      try {
        const service = await GlobalServiceModule.createGlobalService(data.globalService[1]);
        expect(service.name).to.be.a('string');
        expect(service.name).to.equal(data.globalService[1].name);
      } catch (e) {
        expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
      }
    });
    it('Should NOT create a service without type', async function () {
      try {
        const service = await GlobalServiceModule.createGlobalService(data.globalService[1]);
        expect(service.name).to.be.a('string');
        expect(service.name).to.equal(data.globalService[1].name);
      } catch (e) {
        expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
      }
    });
  });
});

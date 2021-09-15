import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { FundingModule } from './modules';

describe('Funding Source', function () {
  describe('Create a funding source', function () {
    it('Should create a service', async function () {
      const funding = await FundingModule.createFunding(data.funding[0]);
      expect(funding.name).to.be.a('string');
      expect(funding.name).to.equal(data.funding[0].name);
    });
    it('Should NOT create a funding source without name', async function () {
      try {
        const funding = await FundingModule.createFunding(data.funding[1]);
        expect(funding.name).to.be.a('string');
        expect(funding.name).to.equal(data.funding[1].name);
      } catch (e) {
        expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
      }
    });
    it('Should NOT create a funding source without type', async function () {
      try {
        const funding = await FundingModule.createFunding(data.funding[1]);
        expect(funding.name).to.be.a('string');
        expect(funding.name).to.equal(data.funding[1].name);
      } catch (e) {
        expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
      }
    });
  });
});

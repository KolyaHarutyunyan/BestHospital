import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { FundingModule, StaffModule } from './modules';

describe('Staff', function () {
  describe('Create a staff', function () {
    it('Should create a staff', async function () {
      const staff = await StaffModule.createStaff(data.staff[0]);
      expect(staff.name).to.be.a('string');
      expect(staff.name).to.equal(data.staff[0].firstName);
    });
    // it('Should NOT create a funding source without name', async function () {
    //   try {
    //     const funding = await FundingModule.createFunding(data.funding[1]);
    //     expect(funding.name).to.be.a('string');
    //     expect(funding.name).to.equal(data.funding[1].name);
    //   } catch (e) {
    //     expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
    //   }
    // });
    // it('Should NOT create a funding source without type', async function () {
    //   try {
    //     const funding = await FundingModule.createFunding(data.funding[1]);
    //     expect(funding.name).to.be.a('string');
    //     expect(funding.name).to.equal(data.funding[1].name);
    //   } catch (e) {
    //     expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
    //   }
    // });
  });
});

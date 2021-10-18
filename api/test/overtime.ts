import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { FundingModule, OvertimeModule } from './modules';


describe('Over time', function () {
    describe('Create a overtime', function () {
        it('Should create a overtime', async function () {
            const overtime = await OvertimeModule.createOvertime(data.overtime[0]);
            expect(overtime.name).to.be.a('string');
            expect(overtime.name).to.equal(data.overtime[0].name);
        });
          it('Should NOT create a overtime with wrong type', async function () {
            try {
              const overtime = await OvertimeModule.createOvertime(data.overtime[1]);
            } catch (e) {
              expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
          });
          it('Should NOT create a overtime when threshold is zero', async function () {
            try {
                const overtime = await OvertimeModule.createOvertime(data.overtime[2]);
            } catch (e) {
              expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
          });
    });
});
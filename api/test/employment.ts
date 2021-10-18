import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { FundingModule, EmploymentModule, DepartmentModule, StaffModule } from './modules';

describe('Employment', function () {
    describe('Create a employment', function () {
        it('Should create a employment', async function () {
            const staff = await StaffModule.createStaff(data.staff[0])
            const supervisor = await StaffModule.createStaff(data.staff[0]);
            const department = await DepartmentModule.createDepartment(data.department[0]);
            data.employment[0].staffId = staff.id;
            data.employment[0].supervisor = supervisor.id;
            data.employment[0].departmentId = department.id;

            const employment = await EmploymentModule.createEmployment(data.employment[0]);
            expect(employment.title).to.be.a('string');
            expect(employment.title).to.equal(data.employment[0].title);
        });
        it('Should NOT create a funding source with wrong staffId', async function () {
          try {
            const staff = await StaffModule.createStaff(data.staff[0])
            const supervisor = await StaffModule.createStaff(data.staff[0]);
            const department = await DepartmentModule.createDepartment(data.department[0]);
            // data.employment[0].staffId = staff.id;
            data.employment[0].supervisor = supervisor.id;
            data.employment[0].departmentId = department.id;

            const employment = await EmploymentModule.createEmployment(data.employment[0]);
          } catch (e) {
            expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
          }
        });
        it('Should NOT create a funding source with wrong department', async function () {
          try {
            const staff = await StaffModule.createStaff(data.staff[0])
            const supervisor = await StaffModule.createStaff(data.staff[0]);
            const department = await DepartmentModule.createDepartment(data.department[0]);
            data.employment[0].staffId = staff.id;
            data.employment[0].supervisor = supervisor.id;
            // data.employment[0].departmentId = department.id;

            const employment = await EmploymentModule.createEmployment(data.employment[0]);
          } catch (e) {
            expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
          }
        });
        it('Should NOT create a funding source with wrong supervisor', async function () {
            try {
              const staff = await StaffModule.createStaff(data.staff[0])
              const supervisor = await StaffModule.createStaff(data.staff[0]);
              const department = await DepartmentModule.createDepartment(data.department[0]);
              data.employment[0].staffId = staff.id;
            //   data.employment[0].supervisor = supervisor.id;
              data.employment[0].departmentId = department.id;
  
              const employment = await EmploymentModule.createEmployment(data.employment[0]);
            } catch (e) {
              expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
          });
    });
});

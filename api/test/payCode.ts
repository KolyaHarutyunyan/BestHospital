import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { FundingModule, PayCodeModule, PayCodeTypeModule, EmploymentModule, StaffModule, DepartmentModule } from './modules';

describe('Pay Code', function () {
    describe('Create a pay code', function () {
        it('Should create a pay code', async function () {
            const staff = await StaffModule.createStaff(data.staff[0]);
            const supervisor = await StaffModule.createStaff(data.staff[0]);
            const department = await DepartmentModule.createDepartment(data.department[0]);
            data.employment[0].staffId = staff.id;
            data.employment[0].supervisor = supervisor.id;
            data.employment[0].departmentId = department.id;
            const employment = await EmploymentModule.createEmployment(data.employment[0]);
            const payCodeType = await PayCodeTypeModule.createPayCodeType(data.payCodeType[0])
            data.payCode[0].payCodeTypeId = payCodeType.id;
            data.payCode[0].employmentId = employment.id;
            const payCode = await PayCodeModule.createPayCode(data.payCode[0]);
            expect(payCode.employmentId).to.be.a('string');
            expect(payCode.employmentId).to.equal(data.payCode[0].employmentId);
        });
        it('Should NOT create a pay code with wrong employmentId', async function () {
            try {
                const staff = await StaffModule.createStaff(data.staff[0]);
                const supervisor = await StaffModule.createStaff(data.staff[0]);
                const department = await DepartmentModule.createDepartment(data.department[0]);
                data.employment[0].staffId = staff.id;
                data.employment[0].supervisor = supervisor.id;
                data.employment[0].departmentId = department.id;
                const employment = await EmploymentModule.createEmployment(data.employment[0]);
                const payCodeType = await PayCodeTypeModule.createPayCodeType(data.payCodeType[0])
                data.payCode[0].payCodeTypeId = payCodeType.id;
                // data.payCode[0].employmentId = employment.id;
                const payCode = await PayCodeModule.createPayCode(data.payCode[0]);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
        it('Should NOT create a pay code with wrong pay code type id', async function () {
            try {
                const staff = await StaffModule.createStaff(data.staff[0]);
                const supervisor = await StaffModule.createStaff(data.staff[0]);
                const department = await DepartmentModule.createDepartment(data.department[0]);
                data.employment[0].staffId = staff.id;
                data.employment[0].supervisor = supervisor.id;
                data.employment[0].departmentId = department.id;
                const employment = await EmploymentModule.createEmployment(data.employment[0]);
                const payCodeType = await PayCodeTypeModule.createPayCodeType(data.payCodeType[0])
                // data.payCode[0].payCodeTypeId = payCodeType.id;
                data.payCode[0].employmentId = employment.id;
                const payCode = await PayCodeModule.createPayCode(data.payCode[0]);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
    });
});

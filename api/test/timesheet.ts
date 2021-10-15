import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { PayCodeModule, StaffModule, TimesheetModule, OvertimeModule, PayCodeTypeModule, EmploymentModule, DepartmentModule } from './modules';

describe('Timesheet', function () {
  describe('Create a timesheet', function () {
    it('Should create a timesheet', async function () {
      const overtime = await OvertimeModule.createOvertime(data.overtime[0]);
      const staff = await StaffModule.createStaff(data.staff[0]);
      const supervisor = await StaffModule.createStaff(data.staff[0]);
      const department = await DepartmentModule.createDepartment(data.department[0]);
      data.employment[0].staffId = staff.id;
      data.employment[0].supervisor = supervisor.id;
      data.employment[0].departmentId = department.id;
      const employment = await EmploymentModule.createEmployment(data.employment[0]);
     
      const payCodeType = await PayCodeTypeModule.createPayCodeType(data.payCodeType[0]);
      data.payCode[0].payCodeTypeId = payCodeType.id;
      data.payCode[0].employmentId = employment.id;

      const payCode = await PayCodeModule.createPayCode(data.payCode[0]);
      data.timesheet[0].staffId = staff.id;
      data.timesheet[0].payCode = payCode.id;
      const timesheet = await TimesheetModule.createTimesheet(data.timesheet[0]);

      expect(timesheet.description).to.be.a('string');
      expect(timesheet.description).to.equal(data.timesheet[0].description);
    });
    it('Should NOT create a timesheet with wrong staffId', async function () {
      try {
        const overtime = await OvertimeModule.createOvertime(data.overtime[0]);
        const staff = await StaffModule.createStaff(data.staff[0]);
        const supervisor = await StaffModule.createStaff(data.staff[0]);
        const department = await DepartmentModule.createDepartment(data.department[0]);
        data.employment[0].staffId = staff.id;
        data.employment[0].supervisor = supervisor.id;
        data.employment[0].departmentId = department.id;
        const employment = await EmploymentModule.createEmployment(data.employment[0]);
       
        const payCodeType = await PayCodeTypeModule.createPayCodeType(data.payCodeType[0]);
        data.payCode[0].payCodeTypeId = payCodeType.id;
        data.payCode[0].employmentId = employment.id;
  
        const payCode = await PayCodeModule.createPayCode(data.payCode[0]);
        // data.timesheet[0].staffId = staff.id;
        data.timesheet[0].payCode = payCode.id;
        const timesheet = await TimesheetModule.createTimesheet(data.timesheet[0]);
      } catch (e) {
        expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
      }
    });
    it('Should NOT create a timesheet with wrong payCode', async function () {
      try {
        const overtime = await OvertimeModule.createOvertime(data.overtime[0]);
        const staff = await StaffModule.createStaff(data.staff[0]);
        const supervisor = await StaffModule.createStaff(data.staff[0]);
        const department = await DepartmentModule.createDepartment(data.department[0]);
        data.employment[0].staffId = staff.id;
        data.employment[0].supervisor = supervisor.id;
        data.employment[0].departmentId = department.id;
        const employment = await EmploymentModule.createEmployment(data.employment[0]);
       
        const payCodeType = await PayCodeTypeModule.createPayCodeType(data.payCodeType[0]);
        data.payCode[0].payCodeTypeId = payCodeType.id;
        data.payCode[0].employmentId = employment.id;
  
        const payCode = await PayCodeModule.createPayCode(data.payCode[0]);
        data.timesheet[0].staffId = staff.id;
        // data.timesheet[0].payCode = payCode.id;
        const timesheet = await TimesheetModule.createTimesheet(data.timesheet[0]);
      } catch (e) {
        expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
      }
    });
  });
});

import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { DepartmentModule, StaffModule, PayCodeModule, ClientModule, 
    AuthorizationServiceModule, AppointmentModule, EmploymentModule,
     PayCodeTypeModule, FundingServiceModule, AuthorizationModule, FundingModule,
      GlobalServiceModule, EnrollmentModule, ModifierModule, CredentialModule } from './modules';

describe('Appointment', function () {
    describe('Create a Appointment', function () {
        it('Should create a appointment', async function () {
            const staff = await StaffModule.createStaff(data.staff[0]);
            console.log(staff, 'staff');
            const department = await DepartmentModule.createDepartment(data.department[0]);
            const supervisor = await StaffModule.createStaff(data.staff[0]);
            data.employment[0].departmentId = department.id;
            data.employment[0].supervisor = supervisor.id;
            data.employment[0].staffId = staff.id;

            const employment = await EmploymentModule.createEmployment(data.employment[0]);
            console.log(employment, 'employment');
            const payCodeTypeId = await PayCodeTypeModule.createPayCodeType(data.payCodeType[0]);
            console.log(payCodeTypeId, 'payCodeTypeId');
            data.payCode[0].payCodeTypeId = payCodeTypeId.id;
            data.payCode[0].employmentId = employment.id;
            const payCode = await PayCodeModule.createPayCode(data.payCode[0]);
            console.log(payCode, 'payCode');
            const client = await ClientModule.createClient(data.client[0]);
            console.log(client, 'client');
            const funder = await FundingModule.createFunding(data.funding[0]);
            console.log(funder, 'funder')
            data.enrollment[0].funderId = funder.id;
            data.enrollment[0].clientId = client.id;
            const enrollment = await EnrollmentModule.createEnrollment(data.enrollment[0]);
            console.log(enrollment, 'enrollment')
            data.auth[0].clientId = client.id;
            data.auth[0].funderId = funder.id;
            const auth = await AuthorizationModule.createAuthorization(data.auth[0]);
            console.log(auth, 'auth')
            const globService = await GlobalServiceModule.createGlobalService(data.globalService[0]);
            console.log(globService, 'globService')
            data.fundingService[0].funderId = funder.id;
            data.fundingService[0].serviceId = globService.id;
            const fundingServiceId = await FundingServiceModule.createFundingService(data.fundingService[0]);
            console.log(fundingServiceId, 'fundingServiceId');
            const credential = await CredentialModule.createCredential(data.credential[0]);
            console.log(credential, 'credential');
            data.modifier[0].modifiers[0].credentialId = credential._id;
            data.modifier[0].serviceId = fundingServiceId._id;
            const modifier = await ModifierModule.createModifiers(data.modifier[0]);
            console.log(modifier, 'modifier')
            data.authService[0].authorizationId = auth.id;
            data.authService[0].fundingServiceId = fundingServiceId._id;
            data.authService[0].modifiers.push(modifier.modifiers[0]._id)
            const authService = await AuthorizationServiceModule.createAuthorizationService(data.authService[0]);
            console.log(authService, 'authService');
            data.appointment[0].client = client.id;
            data.appointment[0].authorizedService = authService.id;
            data.appointment[0].staff = staff.id;
            data.appointment[0].staffPayCode = payCode.id;
            const appointment = await AppointmentModule.createAppointment(data.appointment[0]);
            console.log(appointment, 'appointment')
            expect(appointment.type).to.be.a('string');
            expect(appointment.type).to.equal(data.appointment[0].type);
        });
        // it('Should NOT create a department without name', async function () {
        //     try {
        //         const department = await DepartmentModule.createDepartment(data.department[1]);
        //         expect(department.name).to.be.a('string');
        //         expect(department.name).to.equal(data.department[1].name);
        //     } catch (e) {
        //         expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
        //     }
        // });
        // it('Should NOT create a department without type', async function () {
        //     try {
        //         const department = await DepartmentModule.createDepartment(data.department[1]);
        //         expect(department.name).to.be.a('string');
        //         expect(department.name).to.equal(data.department[1].name);
        //     } catch (e) {
        //         expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
        //     }
        // });
    });
});

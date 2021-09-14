import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { DepartmentModule } from './modules';

describe('Department', function () {
    describe('Create a Department', function () {
        it('Should create a department', async function () {
            const department = await DepartmentModule.createDepartment(data.department[0]);
            expect(department.name).to.be.a('string');
            expect(department.name).to.equal(data.department[0].name);
        });
        it('Should NOT create a department without name', async function () {
            try {
                const department = await DepartmentModule.createDepartment(data.department[1]);
                expect(department.name).to.be.a('string');
                expect(department.name).to.equal(data.department[1].name);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
        it('Should NOT create a department without type', async function () {
            try {
                const department = await DepartmentModule.createDepartment(data.department[1]);
                expect(department.name).to.be.a('string');
                expect(department.name).to.equal(data.department[1].name);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
    });
});

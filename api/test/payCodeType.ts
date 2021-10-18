import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { FundingModule, PayCodeTypeModule } from './modules';

describe('Pay Code Type', function () {
    describe('Create a pay code type', function () {
        it('Should create a pay code type', async function () {
            const payCodeType = await PayCodeTypeModule.createPayCodeType(data.payCodeType[0]);
            expect(payCodeType.name).to.be.a('string');
            expect(payCodeType.name).to.equal(data.payCodeType[0].name);
        });
        it('Should NOT create a pay code type with wrong type', async function () {
            try {
                const payCodeType = await PayCodeTypeModule.createPayCodeType(data.payCodeType[1]);
                expect(payCodeType.name).to.be.a('string');
                expect(payCodeType.name).to.equal(data.payCodeType[0].name);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
    });
});

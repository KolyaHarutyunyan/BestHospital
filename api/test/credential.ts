import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { StaffModule, CommentModule, CredentialModule } from './modules';

describe('Credential', function () {
    describe('Create a Credential', function () {
        it('Should create a credential', async function () {
            const credential = await CredentialModule.createCredential(data.credential[0]);
            expect(credential.name).to.be.a('string');
            expect(credential.name).to.equal(data.credential[0].name);
        });
        it('Should NOT create a credential without name', async function () {
            try {
                const credential = await CredentialModule.createCredential(data.credential[1]);
                expect(credential.name).to.be.a('string');
                expect(credential.name).to.equal(data.credential[1].name);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
        it('Should NOT create a credential without type', async function () {
            try {
                const credential = await CredentialModule.createCredential(data.credential[1]);
                expect(credential.name).to.be.a('string');
                expect(credential.name).to.equal(data.credential[1].name);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
    });
});

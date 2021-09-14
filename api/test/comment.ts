import { HttpStatus } from '@nestjs/common';
import { expect } from 'chai';
import { data } from './data';
import { StaffModule, CommentModule } from './modules';

describe('Comment', function () {
    describe('Create a Comment', function () {
        it('Should create a comment', async function () {
            const staff = await StaffModule.createStaff(data.staff[0]);
            const comment = await CommentModule.createComment(data.comment[0], staff.id);
            expect(comment.text).to.be.a('string');
            expect(comment.text).to.equal(data.comment[0].text);
        });
        it('Should NOT create a comment without resource', async function () {
            try {
                const staff = await StaffModule.createStaff(data.staff[0]);
                const comment = await CommentModule.createComment(data.comment[1], null);
                expect(comment.text).to.be.a('string');
                expect(comment.text).to.equal(data.comment[0].text);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
        it('Should NOT create a comment without onModel', async function () {
            try {
                const staff = await StaffModule.createStaff(data.staff[0]);
                const comment = await CommentModule.createComment(data.comment[1], staff.id);
                expect(comment.text).to.be.a('string');
                expect(comment.text).to.equal(data.comment[1].text);
            } catch (e) {
                expect(e.response?.status).to.equal(HttpStatus.BAD_REQUEST);
            }
        });
    });
});

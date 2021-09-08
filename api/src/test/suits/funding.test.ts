import { FundingModule } from '../modules';
import { data } from '../test.data';

export class FundingTest {
    static async addFundingWithCorrectData() {
        const funder = await FundingModule.createFunding(data.funding[0]);
        const description = 'Add Funder With Correct Data ---------';
        if (funder) {
            console.log(description + ' PASS');
        } else {
            console.log(description + ' FAIL');
        }
    }
    static async editFundingWithCorrectData() {
        const funder = await FundingModule.editFunding(data.funding[1], data.funding[1].id);
        const description = 'Edit Funder With Correct Data ---------';
        if (funder) {
            console.log(description + ' PASS');
        } else {
            console.log(description + ' FAIL');
        }
    }
    static async runTestSuite() {
        // await this.addFundingWithCorrectData();
        // await this.editFundingWithCorrectData();

    }
}

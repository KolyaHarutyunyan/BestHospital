import { FundingModule } from '../modules';
import { data } from '../test.data';

export class FundingTest {
  static async addFundingWithCorrectData() {
    // await AppModule.clearDB();
   const funder = await FundingModule.createFunding(data.funding[0]);
    // const auth = await AuthModule.login(data.admins[0]);
    // const office = await OfficeModule.createOffice(auth.token, data.offices[0]);
    // const agent = await AgentModule.createAgent(auth.token, data.agents[0], office.id);
    const description = 'Add Funder With Correct Data ---------';
    if (funder) {
      console.log(description + ' PASS');
    } else {
      console.log(description + ' FAIL');
    }
  }
  static async editFundingWithCorrectData() {
    // await AppModule.clearDB();
   const funder = await FundingModule.editFunding(data.funding[1], data.funding[1].id);
    // const auth = await AuthModule.login(data.admins[0]);
    // const office = await OfficeModule.createOffice(auth.token, data.offices[0]);
    // const agent = await AgentModule.createAgent(auth.token, data.agents[0], office.id);
    const description = 'Edit Funder With Correct Data ---------';
    if (funder) {
      console.log(description + ' PASS');
    } else {
      console.log(description + ' FAIL');
    }
  }
  static async runTestSuite() {
    // await this.addFundingWithCorrectData();
    await this.editFundingWithCorrectData();

  }
}

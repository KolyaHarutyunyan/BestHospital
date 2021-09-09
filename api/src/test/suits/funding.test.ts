import { FundingModule } from '../modules';
import { data } from '../test.data';
import { Util } from '../util';
import { AppModule, GlobalServiceModule, ModifierModule } from '../modules';

export class FundingTest {
    static async addFundingWithCorrectData() {
        await AppModule.clearDB();
        const funder = await FundingModule.createFunding(data.funding[0]);
        const globService = await GlobalServiceModule.createGlobalService(data.globalService[0]);
        const service = await FundingModule.createFundingService(data.fundingService[0], funder.id, globService.id);
        // const credential = await CredentialModule.createCredential(data.modifier[0], service.id, );

        // const modifier = await ModifierModule.createModifiers(data.modifier[0], service.id, credential.id);

        if (service) {
            return true
        } else {
            return false
        }
    }
    // static async editFundingWithCorrectData() {
    //     const funder = await FundingModule.editFunding(data.funding[1], data.funding[1].id);
    //     if (funder) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    // static async addModifierWithCorrectData() {
    //     await AppModule.clearDB();
    //     if (modifier) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    // static async editFundingServiceWithCorrectData() {
    //     const service = await FundingModule.editFundingService(data.fundingService[0], data.fundingService[0].id);
    //     if (service) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    static async runTestSuite() {
        await Util.runTest(this.addFundingWithCorrectData);
        // await Util.runTest(this.editFundingWithCorrectData);
        // await Util.runTest(this.addFundingServiceWithCorrectData);
        // await Util.runTest(this.editFundingServiceWithCorrectData)
    }
}

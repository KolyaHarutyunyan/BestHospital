import { FundingTest } from './suits';

/*** Main routine */
async function runSuits() {
  await FundingTest.runTestSuite();
}

runSuits();

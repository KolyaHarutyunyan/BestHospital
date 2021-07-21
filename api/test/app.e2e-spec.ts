import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { FundingModule } from '../src/funding/funding.module';
import { FundingService } from '../src/funding/funding.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { CreateFundingDTO, FundingDTO } from '../src/funding/dto';

describe('Cats', () => {
  let app: INestApplication;
  let funderService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [FundingModule],
    })
      .overrideProvider(FundingService)
      .useValue(funderService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/Post funders`, () => {

    const funder: CreateFundingDTO = {
      name: "Postman",
      type: "a",
      contact: "a",
      email: "dtdfsdfdsf@gmail.com",
      website: "a",
      phoneNumber: "a",
      address: "aa",
      status: 1
    }
    return request(app.getHttpServer())
      .post('/funding')
      .set('Accept', 'application/json')
      .send(funder)
      .expect(201)
      .expect(HttpStatus.CREATED)
  });

  afterAll(async () => {
    await app.close();
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationserviceController } from './authorizationservice.controller';
import { AuthorizationserviceService } from './authorizationservice.service';

describe('AuthorizationserviceController', () => {
  let controller: AuthorizationserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizationserviceController],
      providers: [AuthorizationserviceService],
    }).compile();

    controller = module.get<AuthorizationserviceController>(AuthorizationserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

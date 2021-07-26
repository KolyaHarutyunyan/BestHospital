import { Test, TestingModule } from '@nestjs/testing';
import { TerminationController } from './termination.controller';
import { TerminationService } from './termination.service';

describe('TerminationController', () => {
  let controller: TerminationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerminationController],
      providers: [TerminationService],
    }).compile();

    controller = module.get<TerminationController>(TerminationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

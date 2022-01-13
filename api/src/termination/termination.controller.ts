import { Controller } from '@nestjs/common';
import { TerminationService } from './termination.service';

@Controller('termination')
export class TerminationController {
  constructor(private readonly terminationService: TerminationService) {}
}

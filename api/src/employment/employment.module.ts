import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { StaffModule } from '../staff';

@Module({
  imports: [StaffModule],
  controllers: [EmploymentController],
  providers: [EmploymentService]
})
export class EmploymentModule { }

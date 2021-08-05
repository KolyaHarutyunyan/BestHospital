import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { StaffModule } from '../staff';
import { DepartmentService } from '../department/department.service';

@Module({
  imports: [StaffModule],
  controllers: [EmploymentController],
  providers: [EmploymentService, DepartmentService]
})
export class EmploymentModule { }

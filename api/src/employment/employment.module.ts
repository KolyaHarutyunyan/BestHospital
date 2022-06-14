import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { StaffModule } from '../staff';
import { EmploymentSanitizer } from './interceptor/employment.interceptor';
import { DepartmentModule } from '../department/department.module';
import { JobModule } from '../job/job.module';

@Module({
  imports: [StaffModule, DepartmentModule, JobModule],
  controllers: [EmploymentController],
  providers: [EmploymentService, EmploymentSanitizer],
  exports: [EmploymentService],
})
export class EmploymentModule {}

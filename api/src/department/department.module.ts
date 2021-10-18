import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentSanitizer } from './interceptor/department.sanitizer';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentSanitizer],
  exports: [DepartmentService]
})
export class DepartmentModule { }

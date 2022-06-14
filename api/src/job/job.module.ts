import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobSanitizer } from './job.sanitizer';

@Module({
  controllers: [JobController],
  providers: [JobService, JobSanitizer],
  exports: [JobService],
})
export class JobModule {}

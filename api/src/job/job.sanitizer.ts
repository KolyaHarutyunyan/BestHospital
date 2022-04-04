import { Injectable } from '@nestjs/common';
import { ISanitize } from '../util';
import { JobDTO } from './dto';
import { IJob } from './interface';

@Injectable()
export class JobSanitizer implements ISanitize {
  sanitize(job: IJob): JobDTO {
    const JobDTO: JobDTO = {
      _id: job.id,
      name: job.name
    };
    return JobDTO;
  }

  sanitizeMany(jobs: IJob[]): JobDTO[] {
    const JobDTOs: JobDTO[] = [];
    for (let i = 0; i < jobs.length; i++) {
      JobDTOs.push(this.sanitize(jobs[i]));
    }
    return JobDTOs;
  }
}

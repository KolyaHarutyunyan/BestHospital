import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseUtil } from '../util/mongoose.util';
import { CreateJobDTO, UpdateJobDTO, JobDTO } from './dto';
import { IJob } from './interface';
import { JobModel } from './job.model';

@Injectable()
export class JobService {
  constructor() {
    this.model = JobModel;
    this.mongooseUtil = new MongooseUtil();
  }
  private model: Model<IJob>;
  private mongooseUtil: MongooseUtil;

  async create(dto: CreateJobDTO): Promise<JobDTO> {
    try {
      let job = new this.model({
        name: dto.name
      });
      await job.save();
      return job;
    }
    catch (e) {
      throw e
    }
  }

  async findAll(): Promise<JobDTO[]> {
    try {
      const jobs = await this.model.find();
      this.checkJob(jobs[0]);
      return jobs
    }
    catch (e) {
      throw e
    }
  }

  async findOne(_id: string): Promise<JobDTO> {
    let job = await this.model.findById({ _id })
    this.checkJob(job)
    return job;
  }

  async update(_id: string, dto: UpdateJobDTO): Promise<JobDTO> {
    try {
      const job = await this.model.findById({ _id });
      this.checkJob(job);
      job.name = dto.name;
      await job.save()
      return job
    }
    catch (e) {
      throw e
    }
  }

  async remove(_id: string): Promise<string> {
    try {
      const job = await this.model.findByIdAndDelete({ _id });
      this.checkJob(job);
      return job._id;
    }
    catch (e) {
      throw e
    }
  }
  /** Private methods */
  /** if the department is not valid, throws an exception */
  private checkJob(department: IJob) {
    if (!department) {
      throw new HttpException(
        'Job with this id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

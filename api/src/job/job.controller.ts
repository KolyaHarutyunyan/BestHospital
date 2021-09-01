import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, UpdateJobDTO, JobDTO } from './dto';
import { ParseObjectIdPipe, Public } from '../util';


@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @Public()
  create(@Body() createJobDto: CreateJobDTO) {
    return this.jobService.create(createJobDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id',  ParseObjectIdPipe) id: string, @Body() updateJobDto: UpdateJobDTO) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id',  ParseObjectIdPipe) id: string) {
    return this.jobService.remove(id);
  }
}

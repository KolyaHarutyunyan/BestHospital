import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, UpdateJobDTO, JobDTO } from './dto';
import { ParseObjectIdPipe } from '../util';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('job')
@ApiTags('Job Endpoints')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: JobDTO })
  create(@Body() createJobDto: CreateJobDTO) {
    return this.jobService.create(createJobDto);
  }

  @Get()
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [JobDTO] })
  findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: JobDTO })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: JobDTO })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateJobDto: UpdateJobDTO) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.jobService.remove(id);
  }
}

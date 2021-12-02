import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, UpdateJobDTO, JobDTO } from './dto';
import { ParseObjectIdPipe, Public } from '../util';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';


@Controller('job')
@ApiTags('Job Endpoints')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: JobDTO })
  create(@Body() createJobDto: CreateJobDTO) {
    return this.jobService.create(createJobDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: [JobDTO] })
  findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: JobDTO })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: JobDTO })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateJobDto: UpdateJobDTO) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @Public()
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.jobService.remove(id);
  }
}

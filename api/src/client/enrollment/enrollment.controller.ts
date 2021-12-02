import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseObjectIdPipe, Public } from '../../util';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDTO, EnrollmentDTO, UpdateEnrollmentDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('enrollment')
@ApiTags('Enrollment Endpoints')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) { }

  /** Create a new enrollment */
  @Post('client/:clientId/funder/:funderId')
  @Public()
  async createEnrollment(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() createEnrollmentDTO: CreateEnrollmentDTO) {
    return await this.enrollmentService.create(createEnrollmentDTO, clientId, funderId);
  }

  /**Get All Enrollment */
  @Get('client/:clientId')
  @Public()
  findAllEnrollment(
    @Param('clientId', ParseObjectIdPipe) clientId: string) {
    return this.enrollmentService.findAll(clientId);
  }

  // update the enrollment
  @Patch(':id/client/:clientId/funder/:funderId')
  @Public()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDTO) {
    return this.enrollmentService.update(id, clientId, funderId, updateEnrollmentDto);
  }
  
  //delete the enrollment
  @Delete(':id')
  @Public()
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.enrollmentService.remove(id);
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParseObjectIdPipe } from '../../util';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDTO, UpdateEnrollmentDTO } from './dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../../authN/authN.constants';

@Controller('enrollment')
@ApiTags('Enrollment Endpoints')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  /** Create a new enrollment */
  @Post('client/:clientId/funder/:funderId')
  @ApiHeader({ name: ACCESS_TOKEN })
  async createEnrollment(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() createEnrollmentDTO: CreateEnrollmentDTO,
  ) {
    return await this.enrollmentService.create(createEnrollmentDTO, clientId, funderId);
  }

  /**Get All Enrollment */
  @Get('client/:clientId')
  @ApiHeader({ name: ACCESS_TOKEN })
  findAllEnrollment(@Param('clientId', ParseObjectIdPipe) clientId: string) {
    return this.enrollmentService.findAll(clientId);
  }

  // update the enrollment
  @Patch(':id/client/:clientId/funder/:funderId')
  @ApiHeader({ name: ACCESS_TOKEN })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDTO,
  ) {
    return this.enrollmentService.update(id, clientId, funderId, updateEnrollmentDto);
  }

  //delete the enrollment
  // @Delete(':id')
  // @ApiHeader({ name: ACCESS_TOKEN })
  // remove(@Param('id', ParseObjectIdPipe) id: string) {
  //   return this.enrollmentService.remove(id);
  // }
}

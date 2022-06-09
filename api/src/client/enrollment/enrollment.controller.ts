import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ParseObjectIdPipe } from '../../util';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDTO, EnrollmentDTO, UpdateEnrollmentDTO } from './dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../../authN/authN.constants';

@Controller('enrollment')
@ApiTags('Enrollment Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  /** Create a new enrollment */
  @Post('client/:clientId/funder/:funderId')
  @ApiOkResponse({ type: [EnrollmentDTO] })
  async createEnrollment(
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() createEnrollmentDTO: CreateEnrollmentDTO,
  ) {
    return await this.enrollmentService.create(createEnrollmentDTO, clientId, funderId);
  }

  /**Get All Enrollment */
  @Get('client/:clientId')
  @ApiOkResponse({ type: [EnrollmentDTO] })
  findAllEnrollment(@Param('clientId', ParseObjectIdPipe) clientId: string) {
    return this.enrollmentService.findAll(clientId);
  }

  // update the enrollment
  @Patch(':id/client/:clientId/funder/:funderId')
  @ApiOkResponse({ type: EnrollmentDTO })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('clientId', ParseObjectIdPipe) clientId: string,
    @Param('funderId', ParseObjectIdPipe) funderId: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDTO,
  ) {
    return this.enrollmentService.update(id, clientId, funderId, updateEnrollmentDto);
  }
  // terminate the enrollment
  @Patch(':id/terminate')
  @ApiOkResponse({ type: EnrollmentDTO })
  async terminate(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.enrollmentService.terminate(id);
  }
  //delete the enrollment
  // @Delete(':id')
  // @ApiHeader({ name: ACCESS_TOKEN })
  // remove(@Param('id', ParseObjectIdPipe) id: string) {
  //   return this.enrollmentService.remove(id);
  // }
}

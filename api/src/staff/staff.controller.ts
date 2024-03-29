import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { StaffDTO, CreateStaffDto, EditStaffDTO, StaffQueryDTO } from './dto';
import { ACCESS_TOKEN, UserDTO } from '../authN';
import { Public, ParseObjectIdPipe } from '../util';
import { ClinicalStatus } from './staff.constants';

@Controller('staff')
@ApiTags('Staff Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  /** Create a new staff */
  @Post()
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  async createSuperAdmin(@Body() createStaffDTO: CreateStaffDto): Promise<StaffDTO> {
    const admin = await this.staffService.create(createStaffDTO);
    return admin;
  }

  /** Edit a staff */
  @Patch(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: StaffDTO })
  async edit(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: EditStaffDTO,
  ): Promise<StaffDTO> {
    const admin = await this.staffService.edit(id, dto);
    return admin;
  }

  /** Get All Staffs */
  @Get()
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: [StaffDTO] })
  @ApiQuery({
    name: 'skip',
    description: 'where',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    description: 'how',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'status',
    description: 'status',
    required: false,
    type: StaffQueryDTO,
  })
  @ApiQuery({
    name: 'isClinical',
    description: 'isClinical',
    required: false,
    enum: ClinicalStatus,
  })
  // @ApiQuery({ name: 'status', enum: StaffStatus })
  async getUsers(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('status') status: string,
    @Query('isClinical') isClinical: ClinicalStatus,
  ): Promise<StaffDTO[]> {
    return await this.staffService.getUsers(skip, limit, status, isClinical);
  }

  /** Get the staff profile */
  @Get('myProfile')
  @ApiOkResponse({ type: StaffDTO })
  async getMyProfile(@Body('user') user: UserDTO): Promise<StaffDTO> {
    return await this.staffService.getProfile(user.id);
  }

  /** Get the staff profile */
  @Get(':id')
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
  async getAdminProfile(@Param('id', ParseObjectIdPipe) userId: string): Promise<StaffDTO> {
    return await this.staffService.getProfile(userId);
  }
  @Patch(':id/active')
  @ApiOkResponse({ type: StaffDTO })
  async active(@Param('id', ParseObjectIdPipe) id: string): Promise<StaffDTO> {
    return await this.staffService.active(id);
  }
  @Patch(':id/inActive')
  @ApiQuery({
    name: 'reason',
    description: 'reason',
    required: false,
    type: String,
  })
  @ApiOkResponse({ type: StaffDTO })
  async inActive(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('reason') reason: string,
  ): Promise<StaffDTO> {
    return await this.staffService.inActive(id, reason);
  }
  /** IsClinical a staff */
  @Patch(':id/:isClinical')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: StaffDTO })
  async setClinical(
    @Param('id', ParseObjectIdPipe) staffId: string,
    @Param('isClinical') isClinical: boolean,
  ): Promise<StaffDTO> {
    const staff = await this.staffService.setClinical(staffId, isClinical);
    return staff;
  }
  /** Create a new service */
  @Post(':id/service/:serviceId')
  @ApiOkResponse({ type: StaffDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
  async addService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<StaffDTO> {
    const service = await this.staffService.addService(id, serviceId);
    return service;
  }
  /** Get service */
  @Get(':id/service')
  @ApiOkResponse({ type: StaffDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
  async getService(@Param('id', ParseObjectIdPipe) id: string): Promise<StaffDTO> {
    const service = await this.staffService.getService(id);
    return service;
  }
  /** Delete a service */
  @Delete(':id/service/:serviceId')
  @ApiOkResponse({ type: String })
  @ApiHeader({ name: ACCESS_TOKEN })
  async deleteService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<string> {
    const service = await this.staffService.deleteService(id, serviceId);
    return service;
  }
}

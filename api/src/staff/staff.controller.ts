import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { StaffDTO, CreateStaffDto, EditStaffDTO, StaffQueryDTO } from './dto';
import { ACCESS_TOKEN, UserDTO } from '../authN';
import { Public, ParseObjectIdPipe } from '../util';
import { StaffStatus } from './staff.constants';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';

@Controller('staff')
@ApiTags('Staff Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  /** Create a new staff */
  @Post()
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
  async createSuperAdmin(@Body() createStaffDTO: CreateStaffDto): Promise<StaffDTO> {
    const admin = await this.staffService.create(createStaffDTO, createStaffDTO.user.id);
    return admin;
  }

  /** Edit a staff */
  @Patch(':id')
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: StaffDTO })
  async edit(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: EditStaffDTO,
  ): Promise<StaffDTO> {
    const admin = await this.staffService.edit(id, dto, dto.user.id);
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
  // @ApiQuery({ name: 'status', enum: StaffStatus })
  async getUsers(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('status') status: string,
  ): Promise<StaffDTO[]> {
    return await this.staffService.getUsers(skip, limit, status);
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

  /** Inactivate a staff */
  @Patch(':id/setStatus')
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
  @ApiQuery({ name: 'status', enum: StaffStatus })
  @ApiOkResponse({ type: StaffDTO })
  async setStatus(
    @Param('id', ParseObjectIdPipe) staffId: string,
    @Body() dto: CreateTerminationDto,
    @Query() status: StaffQueryDTO,
  ): Promise<StaffDTO> {
    console.log(status);
    const staff = await this.staffService.setStatus(staffId, status.status, dto);
    return staff;
  }

  /** Activated a staff */
  // @Patch(':id/activate')
  // @Public()
  // @ApiOkResponse({ type: StaffDTO })
  // async activate(@Param('id', ParseObjectIdPipe) staffId: string): Promise<StaffDTO> {
  //   const staff = await this.staffService.setStatusActive(staffId, 1);
  //   return staff;
  // }

  /** IsClinical a staff */
  @Patch(':id/:isClinical')
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: StaffDTO })
  async isClinical(
    @Param('id', ParseObjectIdPipe) staffId: string,
    @Param('isClinical') isClinical: boolean,
  ): Promise<StaffDTO> {
    const staff = await this.staffService.isClinical(staffId, isClinical);
    return staff;
  }
  /** Create a new service */
  @Post(':id/service/:serviceId')
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
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
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
  async getService(@Param('id', ParseObjectIdPipe) id: string): Promise<StaffDTO> {
    const service = await this.staffService.getService(id);
    return service;
  }
  /** Delete a service */
  @Delete(':id/service/:serviceId')
  @ApiOkResponse({ type: String })
  @Public()
  // @ApiHeader({ name: ACCESS_TOKEN })
  async deleteService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<string> {
    const service = await this.staffService.deleteService(id, serviceId);
    return service;
  }
}

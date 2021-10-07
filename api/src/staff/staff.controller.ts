import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { StaffDTO, CreateStaffDto, EditStaffDTO } from './dto';
import { ACCESS_TOKEN } from '../authN';
import { Public, ParseObjectIdPipe } from '../util';
import { UserStatus } from './staff.constants';
import { CreateTerminationDto } from '../termination/dto/create-termination.dto';
import { CreateStaffDtoTest } from './dto/createTest.dto';

@Controller('staff')
@ApiTags('Staff Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

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
  @Public()
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
    type: Number,
  })
  async getUsers(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Query('status') status: number,
  ): Promise<StaffDTO[]> {
    return await this.staffService.getUsers(skip, limit, status);
  }

  /** Get the staff profile */
  @Get(':id')
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  async getAdminProfile(@Param('id', ParseObjectIdPipe) userId: string): Promise<StaffDTO> {
    return await this.staffService.getProfile(userId);
  }

  /** Inactivate a staff */
  @Patch(':id/inactivate')
  @Public()
  @ApiOkResponse({ type: StaffDTO })
  async inactivate(
    @Param('id', ParseObjectIdPipe) staffId: string,
    @Body() dto: CreateTerminationDto,
  ): Promise<StaffDTO> {
    const staff = await this.staffService.setStatusInactive(staffId, 0, dto);
    return staff;
  }

  /** Activated a staff */
  @Patch(':id/activate')
  @Public()
  @ApiOkResponse({ type: StaffDTO })
  async activate(@Param('id', ParseObjectIdPipe) staffId: string): Promise<StaffDTO> {
    const staff = await this.staffService.setStatusActive(staffId, 1);
    return staff;
  }

  /** Create a new service */
  @Post(':id/service/:serviceId')
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  async addService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Param('id', ParseObjectIdPipe) id: string): Promise<StaffDTO> {
    const service = await this.staffService.addService(id, serviceId);
    return service;
  }
  /** Get service */
  @Get(':id/service')
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  async getService(
    @Param('id', ParseObjectIdPipe) id: string): Promise<StaffDTO> {
    const service = await this.staffService.getService(id);
    return service;
  }
  /** Delete a service */
  @Delete(':id/service/:serviceId')
  @ApiOkResponse({ type: String })
  @Public()
  async deleteService(
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Param('id', ParseObjectIdPipe) id: string): Promise<string> {
    const service = await this.staffService.deleteService(id, serviceId);
    return service;
  }
}

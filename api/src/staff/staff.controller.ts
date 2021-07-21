import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { StaffDTO, CreateStaffDto, EditStaffDTO } from './dto';
import { ACCESS_TOKEN } from '../authN';
import { Public, ParseObjectIdPipe } from '../util';
import { AuthZGuard, PermissionList } from 'src/authZ';

@Controller('staff')
@ApiTags('Admin Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  /** Create a new admin */
  @Post()
  @Public()
  @ApiOkResponse({ type: StaffDTO })
  async create(@Body() createStaffDTO: CreateStaffDto): Promise<StaffDTO> {
    const admin = await this.staffService.create(createStaffDTO);
    return admin;
  }

  /** Edit an admin */
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

  /** Create a new admin */
  @Post('superAdmin')
  @Public()
  async createSuperAdmin(
    @Body() createStaffDTO: CreateStaffDto,
  ): Promise<StaffDTO> {
    const admin = await this.staffService.create(createStaffDTO);
    return admin;
  }

  /** Get All Users */
  @Get()
  @Public()
  @ApiOkResponse({ type: [StaffDTO] })
  async getUsers(): Promise<StaffDTO[]> {
    return await this.staffService.getUsers();
  }

  /** Get the user profile */
  @Get(':id')
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  async getAdminProfile(
    @Param('id', ParseObjectIdPipe) userId: string,
  ): Promise<StaffDTO> {
    return await this.staffService.getProfile(userId);
  }
}

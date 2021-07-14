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
import { AdminService } from './admin.service';
import { AdminDTO, CreateAdminDTO, EditAdminDTO } from './dto';
import { ACCESS_TOKEN } from '../authN';
import { Public, ParseObjectIdPipe } from '../util';
import { AuthZGuard, PermissionList } from 'src/authZ';

@Controller('admins')
@ApiTags('Admin Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /** Create a new admin */
  @Post()
  @Public()
  @ApiOkResponse({ type: AdminDTO })
  async create(@Body() createAdminDTO: CreateAdminDTO): Promise<AdminDTO> {
    const admin = await this.adminService.create(createAdminDTO);
    return admin;
  }

  /** Edit an admin */
  @Patch(':id')
  @Public()
  @ApiOkResponse({ type: AdminDTO })
  async edit(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: EditAdminDTO,
  ): Promise<AdminDTO> {
    const admin = await this.adminService.edit(id, dto);
    return admin;
  }

  /** Create a new admin */
  @Post('superAdmin')
  @Public()
  async createSuperAdmin(
    @Body() createAdminDTO: CreateAdminDTO,
  ): Promise<AdminDTO> {
    const admin = await this.adminService.create(createAdminDTO);
    return admin;
  }

  /** Get All Users */
  @Get()
  @Public()
  @ApiOkResponse({ type: [AdminDTO] })
  async getUsers(): Promise<AdminDTO[]> {
    return await this.adminService.getUsers();
  }

  /** Get the user profile */
  @Get(':id')
  @ApiOkResponse({ type: AdminDTO })
  @Public()
  async getAdminProfile(
    @Param('id', ParseObjectIdPipe) userId: string,
  ): Promise<AdminDTO> {
    return await this.adminService.getProfile(userId);
  }
}

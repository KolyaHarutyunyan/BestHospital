import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthNService } from '../authN';
import { AdminService } from './admin.service';
import { AdminDTO, CreateAdminDTO } from './dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from 'src/authN/authN.constants';
import { Public } from 'src/util/decorators';

@Controller('admins')
@ApiTags('Admin Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authNService: AuthNService,
  ) {}

  /** Create a new admin */
  @Post()
  // @UseGuards(new AuthZGuard([Permissions.MANAGE_USERS.code]))
  async create(@Body() createAdminDTO: CreateAdminDTO): Promise<AdminDTO> {
    const admin = await this.adminService.create(createAdminDTO);
    await this.authNService.create(createAdminDTO);
    return admin;
  }

  /** Create a new admin */
  @Post('superAdmin')
  @Public()
  // @UseGuards(new AuthZGuard([Permissions.MANAGE_USERS.code]))
  async createSuperAdmin(
    @Body() createAdminDTO: CreateAdminDTO,
  ): Promise<AdminDTO> {
    const admin = await this.adminService.create(createAdminDTO);
    await this.authNService.create(createAdminDTO);
    return admin;
  }

  /** Get All Users */
  @Get()
  @ApiOkResponse({ type: [AdminDTO] })
  async getUsers(): Promise<AdminDTO[]> {
    return await this.adminService.getUsers();
  }

  /** Get the user profile */
  @Get('profile')
  @ApiOkResponse({ type: AdminDTO })
  async getAdminProfile(@Body('userId') userId: string): Promise<AdminDTO> {
    return await this.adminService.findById(userId);
  }
}

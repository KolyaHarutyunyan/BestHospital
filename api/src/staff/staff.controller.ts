import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { StaffDTO, CreateStaffDto, EditStaffDTO, CreateStaffCredentialDto, EditStaffCredentialDTO, StaffCredentialDTO } from './dto';
import { ACCESS_TOKEN } from '../authN';
import { Public, ParseObjectIdPipe } from '../util';
import { AuthZGuard, PermissionList } from 'src/authZ';

@Controller('staff')
@ApiTags('Staff Endpoints')
@ApiHeader({ name: ACCESS_TOKEN })
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  /** Create a new admin */
  // @Post()
  // @Public()
  // @ApiOkResponse({ type: StaffDTO })
  // async create(@Body() createStaffDTO: CreateStaffDto): Promise<StaffDTO> {
  //   console.log('ok');
  //   const admin = await this.staffService.create(createStaffDTO);
  //   return admin;
  // }


  /** Create a new staff */
  @Post()
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  async createSuperAdmin(
    @Body() createStaffDTO: CreateStaffDto,
  ): Promise<StaffDTO> {
    const admin = await this.staffService.create(createStaffDTO);
    return admin;
  }

  /** Edit a staff */
  @Patch(':id')
  @ApiOkResponse({ type: StaffDTO })
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
    name: "status",
    description: "status",
    required: false,
    type: Number
  })
  async getUsers(
    @Query('status') status: number): Promise<StaffDTO[]> {
    return await this.staffService.getUsers(status);
  }

  /** Get the staff profile */
  @Get(':id')
  @ApiOkResponse({ type: StaffDTO })
  @Public()
  async getAdminProfile(
    @Param('id', ParseObjectIdPipe) userId: string,
  ): Promise<StaffDTO> {
    return await this.staffService.getProfile(userId);
  }







  /** Create a new staff credential */
  @Post('credential')
  @ApiOkResponse({ type: StaffCredentialDTO })
  @Public()
  async createStaffCredential(
    @Body() createStaffCredentialDTO: CreateStaffCredentialDto,
  ): Promise<StaffCredentialDTO> {
    const staffCredential = await this.staffService.createStaffCredential(createStaffCredentialDTO);
    return staffCredential;
  }

  /** Get the credential profile */
  @Get(':id/credential')
  @ApiOkResponse({ type: StaffCredentialDTO })
  @Public()
  async findCredential(
    @Param('id', ParseObjectIdPipe) staffId: string,
  ): Promise<StaffCredentialDTO> {
    return await this.staffService.findCredential(staffId);
  }
  /** Edit a system */
  @Patch(':id/system')
  @Public()
  @ApiOkResponse({ type: StaffCredentialDTO })
  async editCredential(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: EditStaffCredentialDTO,
  ): Promise<StaffCredentialDTO> {
    const credential = await this.staffService.editCredential(id, dto);
    return credential;
  }

  /** Delete a credential */
  @Delete(':id/credential')
  @Public()
  @ApiOkResponse({ type: 'string' })
  async deleteCredential(
    @Param('id', ParseObjectIdPipe) id: string
  ): Promise<string> {
    const credential = await this.staffService.deleteCredential(id);
    return credential;
  }
}

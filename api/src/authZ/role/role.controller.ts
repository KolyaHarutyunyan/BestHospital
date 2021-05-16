import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthNGuard } from '../../authN';
import { Public } from '../../util/decorators';
import { RoleService } from './role.service';
import {
  CreateRoleDTO,
  RoleDTO,
  RolePermissionDTO,
  RoleUpdateDTO,
} from './dto';
import { AuthZGuard } from '../guards';

@Controller('authz/roles')
@ApiTags('Authorization - Roles')
// @UseGuards(new AuthZGuard([Permissions.MANAGE_ROLES.code]))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /** Get all roles */
  @Get()
  @ApiOkResponse({ type: [RoleDTO] })
  @Public()
  async getAllRoles(): Promise<RoleDTO[]> {
    const roles = await this.roleService.getRoles();
    return roles;
  }

  /** Get A single role with its ID */
  @Get(':roleId')
  @ApiOkResponse({ type: RoleDTO })
  @Public()
  async getRole(@Param('roleId') roleId: string): Promise<RoleDTO> {
    const role = await this.roleService.getRole(roleId);
    return role;
  }

  /** update role details to a role */
  @Patch(':roleId')
  @ApiOkResponse({ type: RoleDTO })
  @ApiBody({ type: RoleUpdateDTO })
  @Public()
  async updateRole(
    @Param('roleId') roleId: string,
    @Body() roleUpdateDTO: RoleUpdateDTO,
  ): Promise<RoleDTO> {
    const role = await this.roleService.updateRole(roleId, roleUpdateDTO);
    return role;
  }

  /** Add Permission to a role */
  /** Create a new role */
  @Patch(':roleId/addPermissions')
  @ApiBody({ type: RolePermissionDTO })
  @ApiOkResponse({ type: RoleDTO })
  @Public()
  async addPermissionToRole(
    @Param('roleId') roleId: string,
    @Body('permissionId') permissionId: string,
  ): Promise<RoleDTO> {
    const role = await this.roleService.addPermission(roleId, permissionId);
    return role;
  }

  /** remove Permission from a role */
  @Patch(':roleId/removePermissions')
  @ApiBody({ type: RolePermissionDTO })
  @ApiOkResponse({ type: RoleDTO })
  @Public()
  async removePermissionFromRole(
    @Param('roleId') roleId: string,
    @Body('permissionId') permissionId: string,
  ): Promise<RoleDTO> {
    const role = await this.roleService.removePermission(roleId, permissionId);
    return role;
  }

  /** Create a new role */
  @Post()
  @ApiBody({ type: CreateRoleDTO })
  @ApiOkResponse({ type: RoleDTO })
  @Public()
  async createRole(@Body() createRole: CreateRoleDTO): Promise<RoleDTO> {
    const role = await this.roleService.createRole(createRole);
    return role;
  }

  /** Create Default role */
  @Post('default')
  @ApiBody({ type: CreateRoleDTO })
  @ApiOkResponse({ type: RoleDTO })
  @Public()
  async createDefaultRole(@Body() createRole: CreateRoleDTO): Promise<RoleDTO> {
    const roles = await this.roleService.createRole(createRole, {
      isDefault: true,
    });
    return roles[0];
  }

  /** Delete a role with its id */
  @Delete(':id')
  @Public()
  @ApiOkResponse({ type: String, description: 'Id of the deleted role' })
  async deleteRole(@Param('id') roleId: string): Promise<string> {
    return await this.roleService.deleteRole(roleId);
  }
}

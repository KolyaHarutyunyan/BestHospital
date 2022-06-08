import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../util/decorators';
import { RoleService } from './role.service';
import { CreateRoleDTO, RoleDTO, RolePermissionsDTO, RoleUpdateDTO } from './dto';
import { summaries } from './role.constants';
import { IRoleCount } from './interface';

@Controller('authz/roles')
@ApiTags('Authorization - Roles')
// @UseGuards(new AuthZGuard([Permissions.MANAGE_ROLES.code]))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /** Get all roles */
  @Get()
  @ApiOkResponse({ type: [RoleDTO] })
  @Public()
  async getAllRoles(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ): Promise<IRoleCount> {
    return await this.roleService.getRoles(skip, limit);
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
  @ApiBody({ type: RolePermissionsDTO })
  @ApiOkResponse({ type: RoleDTO })
  @ApiOperation({ summary: summaries.ADD_PERMISSION })
  @Public()
  async addPermissionToRole(
    @Param('roleId') roleId: string,
    @Body('permissions') permissions: string[],
  ): Promise<RoleDTO> {
    const role = await this.roleService.addPermissions(roleId, permissions);
    return role;
  }

  /** remove Permission from a role */
  @Patch(':roleId/removePermissions')
  @ApiBody({ type: RolePermissionsDTO })
  @ApiOkResponse({ type: RoleDTO })
  @ApiOperation({ summary: summaries.REMOVE_PERMISSION })
  @Public()
  async removePermissionFromRole(
    @Param('roleId') roleId: string,
    @Body('permissions') permissions: string[],
  ): Promise<RoleDTO> {
    const role = await this.roleService.removePermission(roleId, permissions);
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { AuthNGuard } from '../../authN';
import { Public } from '../../util';
import { AddPermissionDTO, PermissionDTO, UpdatePermissionDTO } from './dto';
// import { AuthZGuard } from '../guards/';
import { PermissionService } from './permission.service';

@Controller('authz/permissions')
@ApiTags('Authorization - Permissions')
// @UseGuards(new AuthZGuard([Permissions.MANAGE_ROLES.code]))
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  /** Permissions */
  @Get()
  @Public()
  @ApiOkResponse({ type: [PermissionDTO] })
  async getPermissions() {
    const permissions = await this.permissionService.getAll();
    return permissions;
  }

  /** add a new permission the list of persmissons in the system */
  @Post()
  @ApiBody({ type: [AddPermissionDTO] })
  @ApiOkResponse({ type: [PermissionDTO] })
  @Public()
  async addPermissions(@Body() permissions: AddPermissionDTO[]): Promise<PermissionDTO[]> {
    return await this.permissionService.add(permissions);
  }

  /** Deletes a persmission.
   * @returns 1 if successfull or 0 if not
   * */
  @Delete(':id')
  @ApiOkResponse({
    type: String,
    description: ' The Id of the permission that was deleted',
  })
  @Public()
  async deletePermission(@Param('id') permissionId: string): Promise<number> {
    return await this.permissionService.delete(permissionId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PermissionDTO })
  @ApiBody({ type: UpdatePermissionDTO })
  @Public()
  async updatePermission(
    @Param('id') permissionId: string,
    @Body() permissionUpdateDTO: UpdatePermissionDTO,
  ): Promise<PermissionDTO> {
    const permission = await this.permissionService.update(permissionId, permissionUpdateDTO);
    return permission;
  }
}

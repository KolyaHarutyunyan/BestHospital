import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleSanitizer } from './interceptors';
import { PermissionModule } from '../permission';

@Module({
  imports: [PermissionModule],
  providers: [RoleService, RoleSanitizer],
  controllers: [RoleController],
  exports: [RoleService, RoleSanitizer],
})
export class RoleModule {}

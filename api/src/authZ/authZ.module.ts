import { Module } from '@nestjs/common';
import { AuthZController } from './authZ.controller';
import { RoleModule } from './role';
import { PermissionModule } from './permission';
@Module({
  imports: [RoleModule, PermissionModule],
  controllers: [AuthZController],
  exports: [RoleModule],
})
export class AuthZModule {}

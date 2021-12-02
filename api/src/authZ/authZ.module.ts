import { Module } from '@nestjs/common';
import { AuthZController } from './authZ.controller';
import { RoleModule } from './role';
import { PermissionModule } from './permission';
import { AuthZService } from './authZ.service';
@Module({
  imports: [RoleModule, PermissionModule],
  controllers: [AuthZController],
  providers: [AuthZService],
  exports: [RoleModule, AuthZService, PermissionModule],
})
export class AuthZModule {}

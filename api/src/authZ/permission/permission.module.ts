import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PermissionSanitizer } from './interceptors';

@Module({
  providers: [PermissionService, PermissionSanitizer],
  controllers: [PermissionController],
  exports: [PermissionSanitizer],
})
export class PermissionModule {}

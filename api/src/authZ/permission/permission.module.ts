import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Sanitizer } from './interceptors';

@Module({
  providers: [PermissionService, Sanitizer],
  controllers: [PermissionController],
})
export class PermissionModule {}

import { Module } from '@nestjs/common';
import { RoleService } from './Role.service';
import { RoleController } from './Role.controller';
import { Sanitizer } from './interceptors';

@Module({
  providers: [RoleService, Sanitizer],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}

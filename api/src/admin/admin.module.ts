import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthNModule } from '../authN';
import { AdminSanitizer } from './interceptor';
import { AddressModule } from 'src/address';

@Module({
  imports: [AuthNModule, AddressModule],
  providers: [AdminService, AdminSanitizer],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}

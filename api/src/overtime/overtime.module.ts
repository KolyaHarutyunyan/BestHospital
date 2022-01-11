import { Module } from '@nestjs/common';
import { OvertimeService } from './overtime.service';
import { OvertimeController } from './overtime.controller';
import { OvertimeSanitizer } from './interceptor';

@Module({
  controllers: [OvertimeController],
  providers: [OvertimeService, OvertimeSanitizer],
  exports: [OvertimeService],
})
export class OvertimeModule {}

import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { PlaceSanitizer } from './interceptor/place.interceptor';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService, PlaceSanitizer],
  exports: [PlaceService]
})
export class PlaceModule { }

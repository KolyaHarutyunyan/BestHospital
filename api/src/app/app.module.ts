import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseConnection } from './app.database';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule {}

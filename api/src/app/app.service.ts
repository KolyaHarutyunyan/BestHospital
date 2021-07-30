import { Get, Injectable } from '@nestjs/common';
import { DatabaseConnection } from './app.database';

@Injectable()
export class AppService {
  constructor(private readonly databaseConnection: DatabaseConnection) {
    this.databaseConnection.connect();
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}

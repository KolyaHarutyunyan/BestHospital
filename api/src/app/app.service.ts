import { Get, Injectable } from '@nestjs/common';
import { DatabaseConnection } from './app.database';

@Injectable()
export class AppService {
  constructor(private readonly databaseConnection: DatabaseConnection) {
    this.databaseConnection.connect();
  }

  @Get()
  getHello(): string {
    return 'Welcome to the API of the Armat. Please visit https://armat.org/api-doc to see documentation about the possible endpoints';
  }
}

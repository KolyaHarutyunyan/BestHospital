import { Controller, Get } from '@nestjs/common';
import { Public } from '../util';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('dropDatabase')
  @Public()
  async dropDatabase() {
    await this.appService.dropDatabase();
  }
  // @Get()
  // @Render('./apiHome.html')
  // getHello() {
  //   return { message: 'hello world' };
  // }
}

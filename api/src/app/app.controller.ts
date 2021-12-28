import { Public } from '../util';
import { AppService } from './app.service';
import { Get, Controller, Render, Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('dropDatabase')
  @Public()
  async dropDatabase() {
    await this.appService.dropDatabase();
  }

  @Get()
  @Public()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Get('pdf')
  @Public()
  async getInvoicePdfByUUID(
    @Res() res: any,
  ): Promise<void> {

    const buffer = await this.appService.generatePDF()

    res.set({
      // pdf
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=claim.pdf',
      'Content-Length': buffer.length,

      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': 0,
    })

    res.end(buffer)
  }

}

import { Get, Injectable } from '@nestjs/common';
import { DatabaseConnection } from './app.database';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import { EmploymentService } from '../employment/employment.service';

@Injectable()
export class AppService {
  constructor(
    // private readonly employmentService: EmploymentService,

    private readonly databaseConnection: DatabaseConnection,
  ) {
    this.databaseConnection.connect();
  }

  getHello(): string {
    return 'Welcome to the API of the Armat. Please visit https://armat.org/api-doc to see documentation about the possible endpoints';
  }
  async generatePDF(): Promise<Buffer> {
    const content = fs.readFileSync(path.resolve(__dirname, '../../views/index.hbs'), 'utf-8');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(content);

    const buffer = await page.pdf({
      // format: 'A4',
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
      },
    });
    await browser.close();
    return buffer;
  }

  async dropDatabase() {
    await this.databaseConnection.dropDatabase();
  }
}

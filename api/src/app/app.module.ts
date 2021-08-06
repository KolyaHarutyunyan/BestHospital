import { Module } from '@nestjs/common';
import { StaffModule } from '../staff';
import { AuthNModule } from 'src/authN';
import { AuthZModule } from 'src/authZ';
import { FundingModule } from 'src/funding';
import { MailerModule } from '../mailer';
import { AppController } from './app.controller';
import { DatabaseConnection } from './app.database';
import { AppService } from './app.service';
import { AddressModule } from '../address';
import { EmploymentModule } from '../employment';
import { ClientModule } from '../client';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [AuthNModule, AuthZModule, AddressModule, StaffModule, FundingModule, EmploymentModule, ClientModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService, DatabaseConnection],
})
export class AppModule { }

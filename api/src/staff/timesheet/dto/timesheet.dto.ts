import { ApiProperty } from '@nestjs/swagger';
import { IPaytableItem } from '../interface/paytable.interface';
import { TimesheetStatus } from '../timesheet.constants';

export class TimeSheetDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  staffId: string;
  @ApiProperty()
  payCode: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  hours: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  totalAmount: number;
  @ApiProperty()
  overtimes: IPaytableItem[];
  @ApiProperty()
  regularHours: number;
  @ApiProperty()
  regularPay: number;
  @ApiProperty()
  status: TimesheetStatus;
}

import { ApiProperty } from '@nestjs/swagger';
import { FileDTO } from '../../files/dto';
import { ClaimPmtStatus } from '../claim-pmt.contants';

export class ClaimPmtDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  paymentAmount: number;
  @ApiProperty()
  paymentType: string;
  @ApiProperty()
  paymentDate: Date;
  @ApiProperty()
  checkNumber: string;
  @ApiProperty()
  fundingSource: string;
  @ApiProperty()
  totalUsed: number;
  @ApiProperty()
  totalBilled: number;
  @ApiProperty()
  claimIds: string[];
  @ApiProperty()
  status: ClaimPmtStatus;
  @ApiProperty()
  documents: string[];
}

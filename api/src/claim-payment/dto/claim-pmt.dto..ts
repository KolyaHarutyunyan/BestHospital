import { ApiProperty } from '@nestjs/swagger';

export class ClaimPmtDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  paymentAmount: number;
  @ApiProperty()
  paymentType: string;
  @ApiProperty()
  paymnetDate: Date;
  @ApiProperty()
  checkNumber: string;
  @ApiProperty()
  achNumber: string;
  @ApiProperty()
  fundingSource: string;
  @ApiProperty()
  claimId: string;
  @ApiProperty()
  documents: string[];
}

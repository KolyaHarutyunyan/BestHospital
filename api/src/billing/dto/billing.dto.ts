import { ApiProperty } from '@nestjs/swagger';
import { AuthDTO } from '../../client/auth/dto/auth.dto';
import { AuthServiceDTO } from '../../client/auth-service/dto/auth-service.dto';
import { ITxn } from '../../txn/interface';

export class BillingDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  appointment: string;
  @ApiProperty()
  payerBalance: number;
  @ApiProperty()
  payer: string;
  @ApiProperty()
  client: string;
  @ApiProperty()
  staff: string;
  @ApiProperty()
  authorization: AuthDTO | string;
  @ApiProperty()
  authService: AuthServiceDTO | string;
  @ApiProperty()
  placeService: string;
  @ApiProperty()
  totalHours: number;
  @ApiProperty()
  totalUnits: number;
  @ApiProperty()
  dateOfService: Date;
  @ApiProperty()
  billedAmount: number;
  @ApiProperty()
  billedRate: number;
  @ApiProperty()
  payerTotal: number;
  @ApiProperty()
  payerPaid: number;
  @ApiProperty()
  clientResp: number;
  @ApiProperty()
  clientPaid: number;
  @ApiProperty()
  balance: number;
  @ApiProperty()
  clientBalance: number;
  @ApiProperty()
  location: string;
  @ApiProperty()
  claimStatus: string;
  @ApiProperty()
  invoiceStatus: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  transaction?: ITxn[];
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updatedDate: Date;
  billing?: string;
}

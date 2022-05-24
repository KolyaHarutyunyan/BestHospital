import { ApiProperty } from '@nestjs/swagger';
import { AuthorizationDTO } from '../../client/authorization/dto/authorization.dto';
import { AuthorizationServiceDTO } from '../../client/authorizationservice/dto/authorizationService.dto';
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
  authorization: AuthorizationDTO | string;
  @ApiProperty()
  authService: AuthorizationServiceDTO | string;
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

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ITermination } from '../../termination/interface';
import { AddressDTO } from '../../address';
import { FundingStatus } from '../funding.constants';

export class FundingDTO {
  @ApiProperty()
  adminId?: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  contact: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  website: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;
  @ApiProperty({ enum: FundingStatus })
  status: string;
  @ApiProperty()
  termination: ITermination;
}

export class FundingQueryDTO {
  @ApiProperty({ enum: FundingStatus })
  @IsEnum(FundingStatus)
  status: string;
}

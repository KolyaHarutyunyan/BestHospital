import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ITermination } from '../../termination/interface';
import { AddressDTO } from '../../address';
import { FundingStatus, TypeStatus } from '../funding.constants';
import { CreateModifierDto } from '.';
export class FundingDTO {
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
export class ServiceDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  serviceId: string;
  @ApiProperty()
  funderId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  rate: number;
  @ApiProperty()
  cptCode: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  min: number;
  @ApiProperty()
  max: number;
  @ApiProperty()
  credentialIds: string[];
  @ApiProperty()
  chargeRate: number;
  @ApiProperty()
  modifiers?: Array<CreateModifierDto>;
}

export class ModifyDTO {
  @ApiProperty()
  _id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: TypeStatus })
  type: number;
  @ApiProperty()
  chargeRate: number;
  @ApiProperty()
  credentialId: string;
  @ApiProperty()
  status: boolean;
}

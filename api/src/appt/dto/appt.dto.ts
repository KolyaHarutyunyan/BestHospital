import { ApiProperty } from '@nestjs/swagger';
import { ApptStatus, ApptType, EventStatus } from '../appt.constants';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { AddressDTO } from '../../address';
import { FileDTO } from '../../files/dto';
import { AuthorizationServiceDTO } from '../../client/authorizationservice/dto';

// authorizedService: IAuthorizationService | string;

export class ApptDto {
  @ApiProperty()
  _id: string;
  @ApiProperty({ enum: ApptType })
  type: string;
  @ApiProperty()
  client: string;
  @ApiProperty()
  funder: string;
  @ApiProperty()
  authorizedService: AuthorizationServiceDTO | string;
  @ApiProperty()
  staff: string;
  @ApiProperty()
  placeService: string;
  @ApiProperty()
  staffPayCode: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  startTime: Date;
  @ApiProperty()
  endTime: Date;
  @ApiProperty({ type: Boolean })
  require: boolean;
  @ApiProperty({ enum: ApptStatus })
  status: string;
  @ApiProperty({ enum: EventStatus })
  eventStatus: string;
  @ApiProperty()
  cancelReason: string;
  @ApiProperty({ required: false })
  miles?: number;
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;
  @ApiProperty({ required: false })
  signature: boolean;
  @ApiProperty()
  digitalSignature: FileDTO;
}
export class AppointmentQueryDTO {
  @ApiProperty({ enum: EventStatus, required: false })
  @IsEnum(EventStatus)
  @IsOptional()
  eventStatus: EventStatus;
  @ApiProperty({ enum: ApptStatus, required: false })
  @IsEnum(ApptStatus)
  @IsOptional()
  status: ApptStatus;
  @ApiProperty({ enum: ApptType, required: false })
  @IsEnum(ApptType)
  @IsOptional()
  type: ApptType;
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  client: string;
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  staff: string;
}

export class AppointmentQuerySetEventStatusDTO {
  @ApiProperty({ enum: EventStatus, required: false })
  @IsEnum(EventStatus)
  @IsOptional()
  eventStatus: string;
  @ApiProperty({ enum: ApptStatus, required: false })
  @IsEnum(ApptStatus)
  @IsOptional()
  status: string;
}

export class AppointmentQuerySetStatusDTO {
  @ApiProperty({ enum: ApptStatus, required: false })
  @IsEnum(ApptStatus)
  status: string;
}

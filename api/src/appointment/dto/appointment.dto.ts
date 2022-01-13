import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus, AppointmentType, EventStatus } from '../appointment.constants';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { AddressDTO } from '../../address';

export class AppointmentDto {
  @ApiProperty()
  _id: string;
  @ApiProperty({ enum: AppointmentType })
  type: string;
  @ApiProperty()
  client: string;
  @ApiProperty()
  funder: string;
  @ApiProperty()
  authorizedService: string;
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
  @ApiProperty({ enum: AppointmentStatus })
  status: string;
  @ApiProperty({ enum: EventStatus })
  eventStatus: string;
  @ApiProperty({ required: false })
  miles?: number;
  @ApiProperty({ type: AddressDTO })
  address: AddressDTO;
  @ApiProperty({ required: false })
  signature: string;
}

export class AppointmentQueryDTO {
  @ApiProperty({ enum: EventStatus, required: false })
  @IsEnum(EventStatus)
  @IsOptional()
  eventStatus: string;
  @ApiProperty({ enum: AppointmentStatus, required: false })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status: string;
  @ApiProperty({ enum: AppointmentType, required: false })
  @IsEnum(AppointmentType)
  @IsOptional()
  type: string;
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
  @ApiProperty({ enum: AppointmentStatus, required: false })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status: string;
}

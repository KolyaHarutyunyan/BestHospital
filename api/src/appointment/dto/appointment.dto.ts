import { ApiProperty } from "@nestjs/swagger";
import { AppointmentType, EventStatus } from "../appointment.constants";
import { IsEnum, IsMongoId, IsOptional } from "class-validator";
import { AddressDTO } from '../../address';

export class AppointmentDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ enum: AppointmentType })
    type: string;
    @ApiProperty()
    client: string;
    @ApiProperty()
    authorizedService: string;
    @ApiProperty()
    staff: string;
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
    @ApiProperty({ enum: EventStatus })
    status: string;
    @ApiProperty({ required: false })
    miles?: number;
    @ApiProperty({ type: AddressDTO })
    address: AddressDTO;
}

export class AppointmentQueryDTO {
    @ApiProperty({ enum: EventStatus, required: false })
    @IsEnum(EventStatus)
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
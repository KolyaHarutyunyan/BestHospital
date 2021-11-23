import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AppointmentStatus, AppointmentType, EventStatus } from "../appointment.constants";

export class CreateAppointmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(AppointmentType)
    type: string;
    @ApiProperty()
    @IsMongoId()
    @IsString()
    @IsOptional()
    client: string;
    @ApiProperty()
    @IsMongoId()
    @IsString()
    @IsOptional()
    authorizedService: string;
    @ApiProperty()
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    staff: string;
    @ApiProperty()
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    staffPayCode: string;
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    startTime: Date;
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    endTime: Date;
    @ApiProperty({ enum: EventStatus })
    @IsEnum(EventStatus)
    eventStatus: EventStatus;
    @ApiProperty({ enum: AppointmentStatus })
    @IsEnum(AppointmentStatus)
    status: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    require: boolean;
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    miles?: number;
    @ApiProperty({ required: false })
    signature: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";
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
    @IsOptional()
    endTime: Date;
    @ApiProperty({ enum: EventStatus })
    @IsEnum(EventStatus)
    eventStatus: string;
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
    @IsArray()
    @Type(() => String)
    files: String[];
}

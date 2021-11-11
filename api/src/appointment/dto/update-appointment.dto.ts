import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";
import { AppointmentStatus, AppointmentType, EventStatus } from "../appointment.constants";

export class UpdateAppointmentDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(AppointmentType)
    type: string;
    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    client: string;
    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    authorizedService: string;
    @ApiProperty()
    @IsMongoId()
    @IsString()
    @IsOptional()
    staff: string;
    @ApiProperty()
    @IsMongoId()
    @IsOptional()
    staffPayCode: string;
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    startDate: Date;
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    startTime: Date;
    @ApiProperty()
    @IsDateString()
    @IsOptional()
    endTime: Date;
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    require: boolean;
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    miles?: number;
    @ApiProperty({required: false})
    @IsOptional()
    @IsUrl()
    signature: string;
}

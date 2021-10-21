import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EventStatus } from "../appointment.constants";

export class CreateAppointmentDto {
    @ApiProperty()
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    client: string;
    @ApiProperty()
    @IsMongoId()
    @IsString()
    @IsNotEmpty()
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
    @ApiProperty({enum: EventStatus})
    @IsEnum(EventStatus)
    status: string;
}

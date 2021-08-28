import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { HistoryStatus } from '../history.constants';

export class CreateHistoryDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsMongoId()
    @ApiProperty()
    resource: string;
    @ApiProperty({ enum: HistoryStatus })
    @IsEnum(HistoryStatus)
    onModel: string;
}

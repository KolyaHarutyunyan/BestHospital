
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional} from 'class-validator';

export class UpdateAvailabilityDTO {
    @IsArray()
    @IsOptional()
    monday: Array<Object>
    @IsArray()
    @IsOptional()
    tuesday: Array<Object>
}


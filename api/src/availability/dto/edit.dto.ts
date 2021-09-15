
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AvailableTypeDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    id: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    from: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    to: number;
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    available: boolean;
}

export class UpdateAvailabilityDTO {
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    monday: Array<AvailableTypeDTO>
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    tuesday: Array<AvailableTypeDTO>
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    wednesday: Array<AvailableTypeDTO>
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    thursday: Array<AvailableTypeDTO>
    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [AvailableTypeDTO] })
    friday: Array<AvailableTypeDTO>
}


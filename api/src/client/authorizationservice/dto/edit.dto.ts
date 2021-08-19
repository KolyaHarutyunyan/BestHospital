import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateAuthorizationserviceDTO {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    total: number;
    // @ApiProperty()
    // @IsOptional()
    // @IsNumber()
    // completed: number;
    // @ApiProperty()
    // @IsOptional()
    // @IsNumber()
    // available: number;
    // @ApiProperty({required: false})
    // @IsOptional()
    // @IsArray()
    // modifiers: Array<string>;
    @ApiProperty()
    @IsMongoId()
    authorizationId: string;
    @ApiProperty()
    @IsMongoId()
    fundingServiceId: string;
}

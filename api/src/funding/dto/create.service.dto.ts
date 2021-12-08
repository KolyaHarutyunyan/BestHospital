import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserDTO } from '../../authN/dto/user.dto';

export class CreateServiceDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    serviceId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    rate: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cptCode: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    size: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    min: number
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    max: number;
    user: UserDTO
    // @ApiProperty({ enum: TypeStatus })
    // @IsEnum(TypeStatus)
    // type: number;
}

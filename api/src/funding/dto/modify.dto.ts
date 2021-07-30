import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class ModifyDTO {
    @ApiProperty()
    @IsNotEmpty()
    id: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    chargeRate: number
    @ApiProperty()
    credential: string
  
}

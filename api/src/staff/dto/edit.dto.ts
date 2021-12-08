import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { UserDTO } from '../../authN';
import { LicenseDTO } from './license.dto';

export class EditStaffDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  middleName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  email: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  secondaryEmail: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsPhoneNumber('US')
  phone: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  secondaryPhone: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  state: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  gender: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birthday: Date;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  residency: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  ssn: number;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ type: LicenseDTO })
  @ValidateNested({ each: true })
  @Type(() => LicenseDTO)
  @IsOptional()
  license: LicenseDTO;
  user: UserDTO
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { AddressDTO } from '../../address';
import { ResidencyStatus } from '../staff.constants';
import { LicenseDTO } from './license.dto';
import { DTO } from '../../util';

export class CreateStaffDto extends DTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  middleName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  secondaryEmail: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phone: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  secondaryPhone: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;
  @ApiProperty({ enum: ResidencyStatus })
  @IsEnum(ResidencyStatus)
  @IsNotEmpty()
  residency: string;
  @ApiProperty()
  @Matches(/^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/, {
    message: 'Social security number is incorrect',
  })
  ssn: number;
  @ApiProperty({ type: AddressDTO })
  address: string;
  @ApiProperty({ type: LicenseDTO })
  @ValidateNested({ each: true })
  @Type(() => LicenseDTO)
  license: LicenseDTO;
}

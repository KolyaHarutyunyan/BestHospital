import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { UserDTO } from '../../authN';
import { ResidencyStatus } from '../staff.constants';
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
  @ApiProperty({ required: false, enum: ResidencyStatus })
  @IsEnum(ResidencyStatus)
  @IsOptional()
  residency: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/, {
    message: 'Social security number is incorrect',
  })
  ssn: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ type: LicenseDTO })
  @ValidateNested({ each: true })
  @Type(() => LicenseDTO)
  @IsOptional()
  license: LicenseDTO;
  user: UserDTO;
}

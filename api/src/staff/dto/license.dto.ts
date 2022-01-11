import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class LicenseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  driverLicense: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  expireDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;
}

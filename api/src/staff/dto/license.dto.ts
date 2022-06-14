import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LicenseDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  driverLicense: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  expireDate: Date;
  @ApiProperty()
  @IsOptional()
  @IsString()
  state: string;
}

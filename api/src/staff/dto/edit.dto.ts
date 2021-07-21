import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class EditStaffDTO {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  middleName: string;
  @ApiProperty({ required: false })
  @IsString()
  lastName: string;
  @ApiProperty({ required: false })
  @IsString()
  firstEmail: string;
  @ApiProperty({ required: false })
  @IsString()
  secondEmail: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsPhoneNumber('US')
  firstNumber: string;
  @ApiProperty({ required: false })
  @IsString()
  secondNumber: string;
  @ApiProperty({ required: false })
  @IsString()
  driveLicenze: string;
  @ApiProperty({ required: false })
  @IsString()
  state: string;
  @ApiProperty({ required: false })
  @IsString()
  gender: string;
  @ApiProperty({ required: false })
  @IsString()
  birthday: string;
  @ApiProperty({ required: false })
  @IsString()
  residency: string;
  @ApiProperty({ required: false })
  @IsString()
  ssn: string;
  @ApiProperty({ required: false })
  address?: string;
}

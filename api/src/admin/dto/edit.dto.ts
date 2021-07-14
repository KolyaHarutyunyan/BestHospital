import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class EditAdminDTO {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  firstName?: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  lastName?: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  username?: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  email?: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phoneNumber?: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  ssn?: number;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  dl?: string;
  @ApiProperty({ required: false })
  address?: string;

  /** Set by the system */
  id: string;
}

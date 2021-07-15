import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateAdminDTO {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phoneNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  ssn: number;
  @ApiProperty()
  @IsNotEmpty()
  dl: string;
  @ApiProperty({ description: 'the id of the role', required: false })
  role: string;
  @ApiProperty()
  address: string;

  /** Set by the system */
  id: string;
}

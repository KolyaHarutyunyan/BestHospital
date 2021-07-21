import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class CreateStaffDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  middleName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstEmail: string;
  @ApiProperty({ required: false })
  @IsString()
  secondEmail: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  firstNumber: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  secondNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  driveLicenze: string;
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
  @IsString()
  birthday: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  residency: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ssn: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

}
// export class CreateStaffDTO {
//   @ApiProperty()
//   @IsNotEmpty()
//   firstName: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   lastName: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   username: string;
//   @IsEmail()
//   @IsNotEmpty()
//   @ApiProperty()
//   email: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsPhoneNumber('US')
//   phoneNumber: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   ssn: number;
//   @ApiProperty()
//   @IsNotEmpty()
//   dl: string;
//   @ApiProperty({ description: 'the id of the role', required: false })
//   role: string;
//   @ApiProperty()
//   address: string;

//   /** Set by the system */
//   id: string;
// }

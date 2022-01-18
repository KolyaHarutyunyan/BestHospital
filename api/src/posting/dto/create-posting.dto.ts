import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserDTO } from '../../authN';
import { PaymentType } from '../posting.constants';

export class CreatePostingDto {
  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  paymentType: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentReference: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentDocument: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  paymentAmount: number;
  @ApiProperty()
  @IsMongoId()
  payer: string;
  @ApiProperty()
  invoices: Array<string>;
  user?: UserDTO;
}

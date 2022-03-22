import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
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
  @IsPositive()
  @IsNotEmpty()
  paymentAmount: number;
  @ApiProperty()
  @IsMongoId()
  payer: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  invoice: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  paymentDate: Date;
  // @ApiProperty()
  // client: string;
  user?: UserDTO;
}

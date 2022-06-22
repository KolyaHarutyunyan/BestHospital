import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNumber } from 'class-validator';
import { PayCodeTypeDTO } from '../../../paycodetype/dto';

export class PayCodeDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsMongoId()
  employmentId: string;
  @ApiProperty()
  payCodeTypeId: string | PayCodeTypeDTO;
  @IsNumber()
  rate: number;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  terminationDate: Date;
}

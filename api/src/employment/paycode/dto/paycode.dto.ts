import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNumber } from 'class-validator';
import { PayCodeTypeDTO } from '../../paycodetype/dto';

export class PayCodeDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsMongoId()
  employmentId: string;
  @ApiProperty()
  payCodeTypeId: string | PayCodeTypeDTO;
  @IsNumber()
  rate: number;
  @IsBoolean()
  active: boolean;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate?: Date;
}

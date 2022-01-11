import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PayCodeTypeStatus } from '../paycodetypes.constants';

export class PayCodeTypeDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
  @ApiProperty({ enum: PayCodeTypeStatus })
  @IsEnum(PayCodeTypeStatus)
  type: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  overtime: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  pto: boolean;
}

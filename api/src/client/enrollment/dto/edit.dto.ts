import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateEnrollmentDTO {
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate: Date;
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  terminationDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  primary: boolean;
}

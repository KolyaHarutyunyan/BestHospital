import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AvailableTypeDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  to: number;
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  available: boolean;
}

export class CreateAvailabilityDTO {
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [AvailableTypeDTO] })
  monday: Array<AvailableTypeDTO>;
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [AvailableTypeDTO] })
  tuesday: Array<AvailableTypeDTO>;
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [AvailableTypeDTO] })
  wednesday: Array<AvailableTypeDTO>;
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [AvailableTypeDTO] })
  thursday: Array<AvailableTypeDTO>;
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [AvailableTypeDTO] })
  friday: Array<AvailableTypeDTO>;
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [AvailableTypeDTO] })
  saturday: Array<AvailableTypeDTO>;
  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [AvailableTypeDTO] })
  sunday: Array<AvailableTypeDTO>;
  // @ApiProperty({ enum: ScheduleStatus })
  // @IsEnum(ScheduleStatus)
  // @IsNotEmpty()
  // onModel: string;
}

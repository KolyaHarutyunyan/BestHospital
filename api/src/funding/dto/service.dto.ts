import { ApiProperty } from '@nestjs/swagger';
import { CreateModifierDto } from '../modifier/dto';

export class ServiceDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  serviceId: string;
  @ApiProperty()
  funderId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  rate: number;
  @ApiProperty()
  cptCode: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  min: number;
  @ApiProperty()
  max: number;
  @ApiProperty()
  modifiers?: Array<CreateModifierDto>;
}

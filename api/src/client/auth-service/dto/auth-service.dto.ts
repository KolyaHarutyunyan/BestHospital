import { ApiProperty } from '@nestjs/swagger';
import { ServiceDTO } from '../../../funding/dto';

export class AuthServiceDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  authorizationId: string;
  @ApiProperty()
  serviceId: ServiceDTO | string;
  @ApiProperty()
  total: number;
  @ApiProperty()
  modifiers: Array<string>;
  @ApiProperty()
  completed: number;
  @ApiProperty()
  default: boolean;
}

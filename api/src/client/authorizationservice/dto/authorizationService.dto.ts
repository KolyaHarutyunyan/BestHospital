import { ApiProperty } from '@nestjs/swagger';
import { ServiceDTO } from '../../../funding/dto/service.dto';

export class AuthorizationServiceDTO {
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
}

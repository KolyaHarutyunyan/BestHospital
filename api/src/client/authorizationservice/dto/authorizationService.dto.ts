import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationServiceDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  authorizationId: string;
  @ApiProperty()
  serviceId: string;
  @ApiProperty()
  total: number;
  @ApiProperty()
  modifiers: Array<string>;
  @ApiProperty()
  completed: number;
}

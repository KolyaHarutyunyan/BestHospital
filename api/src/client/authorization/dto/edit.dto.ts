import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorizationDto } from './create.dto';

export class UpdateAuthorizationDto extends PartialType(CreateAuthorizationDto) {}

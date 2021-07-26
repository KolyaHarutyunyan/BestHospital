import { PartialType } from '@nestjs/mapped-types';
import { CreateCredentialDto } from './create.dto';

export class UpdateCredentialDto extends PartialType(CreateCredentialDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateEmploymentDto } from './create.dto';

export class UpdateEmploymentDto extends PartialType(CreateEmploymentDto) {}

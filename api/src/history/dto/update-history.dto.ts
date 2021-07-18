import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryDto } from './create.dto';

export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {}

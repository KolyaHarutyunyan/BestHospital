import { PartialType } from '@nestjs/mapped-types';
import { CreateFundingDto } from './create.dto';

export class UpdateFundingDto extends PartialType(CreateFundingDto) {}

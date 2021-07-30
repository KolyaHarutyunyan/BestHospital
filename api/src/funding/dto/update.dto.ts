import { PartialType } from '@nestjs/mapped-types';
import { CreateFundingDTO } from './create.dto';

export class UpdateFundingDto extends PartialType(CreateFundingDTO) {}

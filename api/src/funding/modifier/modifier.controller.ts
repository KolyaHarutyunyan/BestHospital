import { Controller, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ParseObjectIdPipe, Public } from '../../util';
import { ServiceDTO } from '../dto';
import { CreateModifiersDTO, UpdateModifiersDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('modifier')
@ApiTags('Modifier Endpoints')
export class ModifierController {
  constructor(private readonly modifierService: ModifierService) {}

  @Patch('/setStatus/:fundingServiceId')
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  async delete(
    @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
    @Query('ids') ids: string[],
  ): Promise<any> {
    const modifier = await this.modifierService.delete(fundingServiceId, ids);
    return modifier;
  }
}

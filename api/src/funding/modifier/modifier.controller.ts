import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ParseObjectIdPipe, Public } from '../../util';
import { ServiceDTO } from '../dto';
import { CreateModifiersDTO, UpdateModifiersDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('modifier')
@ApiTags('Modifier Endpoints')
export class ModifierController {
  constructor(private readonly modifierService: ModifierService) {}

  @Post()
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  async createModifier(@Body() createModifierDTO: CreateModifiersDTO): Promise<ServiceDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.create(createModifierDTO);
    return modifier;
  }

  @Patch(':fundingServiceId')
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  async updateModify(
    @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
    @Body() updateModifierDto: UpdateModifiersDto,
  ): Promise<any> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.update(fundingServiceId, updateModifierDto);
    return modifier;
  }

  @Patch('/setStatus/:fundingServiceId')
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  async delete(
    @Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string,
    @Query('ids') ids: String[],
  ): Promise<any> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.delete(fundingServiceId, ids);
    return modifier;
  }
}

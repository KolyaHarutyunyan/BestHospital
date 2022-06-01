import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ServiceDTO } from '../dto';
import { ACCESS_TOKEN } from '../../authN';
import { ParseObjectIdPipe } from '../../util';
import { ModifierService } from '../services/modifier.service';
import { CreateModifiersDTO, UpdateModifiersDto } from '../dto';

@Controller('funding')
@ApiHeader({ name: ACCESS_TOKEN })
@ApiTags('Funding Modifier Endpoints')
export class ModifierController {
  constructor(private readonly modifierService: ModifierService) {}
  @Post(':id/modifiers')
  @ApiOkResponse({ type: ServiceDTO })
  async createModifier(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: CreateModifiersDTO,
  ): Promise<ServiceDTO> {
    const modifier = await this.modifierService.saveModifiers(id, dto.serviceId, dto.modifiers);
    return modifier;
  }
  @Patch(':id/:serviceId/modifiers')
  @ApiOkResponse({ type: ServiceDTO })
  async updateModifiers(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Body() dto: UpdateModifiersDto,
  ): Promise<ServiceDTO> {
    const modifier = await this.modifierService.updateModifiers(id, serviceId, dto);
    return modifier;
  }
  @Patch(':id/:serviceId/modifier/:modifierId/active')
  @ApiOkResponse({ type: ServiceDTO })
  async active(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Param('modifierId', ParseObjectIdPipe) modifierId: string,
  ): Promise<any> {
    const modifier = await this.modifierService.active(id, serviceId, modifierId);
    return modifier;
  }
  @Patch(':id/:serviceId/modifier/:modifierId/inactive')
  @ApiOkResponse({ type: ServiceDTO })
  async inactive(
    @Param('id', ParseObjectIdPipe) id: string,
    @Param('serviceId', ParseObjectIdPipe) serviceId: string,
    @Param('modifierId', ParseObjectIdPipe) modifierId: string,
  ): Promise<any> {
    const modifier = await this.modifierService.inactive(id, serviceId, modifierId);
    return modifier;
  }
}

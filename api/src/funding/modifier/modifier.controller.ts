import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ParseObjectIdPipe, Public } from '../../util';
import { ServiceDTO } from '../dto';
import { CreateModifiersDTO, UpdateModifiersDto, UpdateModifierDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('modifier')
@ApiTags('Modifier Endpoints')
export class ModifierController {
  constructor(private readonly modifierService: ModifierService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  async createModifier(
    @Body() createModifierDTO: CreateModifiersDTO): Promise<ServiceDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.create(createModifierDTO);
    return modifier
  }

  // @Get(':fundingserviceId')
  // @Public()
  // @ApiOkResponse({ type: [ModifyDTO] })
  // async findByServiceId(@Param('fundingserviceId', ParseObjectIdPipe) fundingserviceId: string): Promise<ModifyDTO[]> {
  //   return await this.modifierService.findByServiceId(fundingserviceId);
  // }

  @Patch(':fundingServiceId')
  @Public()
  @ApiOkResponse({ type: ServiceDTO })
  async updateModify(@Param('fundingServiceId', ParseObjectIdPipe) fundingServiceId: string, @Body() updateModifierDto: UpdateModifiersDto): Promise<any> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.update(fundingServiceId, updateModifierDto);
    return modifier;
  }

}

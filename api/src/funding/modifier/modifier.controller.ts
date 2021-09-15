import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ParseObjectIdPipe, Public } from '../../util';
import { CreateModifierDto, CreateModifiersDTO, UpdateModifierDto, ModifyDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('modifier')
@ApiTags('Modifier Endpoints')
export class ModifierController {
  constructor(private readonly modifierService: ModifierService) { }

  /** Create a new modifier */
  @Post()
  @Public()
  // @ApiOkResponse({ type: ServiceDTO })
  async createModifier(
    @Body() createModifierDTO: CreateModifiersDTO): Promise<ModifyDTO> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.create(createModifierDTO);
    return modifier
  }

  @Get(':fundingserviceId')
  @Public()
  // @ApiOkResponse({ type: FundingDTO })
  async findByServiceId(@Param('fundingserviceId', ParseObjectIdPipe) fundingserviceId: string): Promise<any> {
    return await this.modifierService.findByServiceId(fundingserviceId);
  }

  // @Get()
  // findAll() {
  //   return this.modifierService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.modifierService.findOne(+id);
  // }

  @Patch(':id')
  @Public()
  // @ApiOkResponse({ type: FundingDTO })
  async updateModify(@Param('id', ParseObjectIdPipe) id: string, @Body() updateModifierDto: UpdateModifierDto): Promise<any> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.update(id, updateModifierDto);
    return modifier;
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.modifierService.remove(+id);
  // }
}

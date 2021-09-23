import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ParseObjectIdPipe, Public } from '../../util';
import { CreateModifierDto, CreateModifiersDTO, UpdateModifierDto, ModifyDTO, UpdateModifiersDto } from './dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('modifier')
@ApiTags('Modifier Endpoints')
export class ModifierController {
  constructor(private readonly modifierService: ModifierService) { }

  @Post()
  @Public()
  @ApiOkResponse({ type: [ModifyDTO] })
  async createModifier(
    @Body() createModifierDTO: CreateModifiersDTO): Promise<ModifyDTO[]> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.create(createModifierDTO);
    return modifier
  }

  @Get(':fundingserviceId')
  @Public()
  @ApiOkResponse({ type: [ModifyDTO] })
  async findByServiceId(@Param('fundingserviceId', ParseObjectIdPipe) fundingserviceId: string): Promise<ModifyDTO[]> {
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
  @ApiOkResponse({ type: UpdateModifiersDto })
  async updateModify(@Param('id', ParseObjectIdPipe) id: string, @Body() updateModifierDto: UpdateModifiersDto): Promise<any> {
    const staffId = '60f01ec194abb63ff8f0aa75';
    const modifier = await this.modifierService.update(id, updateModifierDto);
    return modifier;
  }

  @Delete(':id')
  @Public()
  @ApiOkResponse({type: String})
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.modifierService.remove(id);
  }
}

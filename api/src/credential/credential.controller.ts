import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto, CredentialDTO, UpdateCredentialDTO } from './dto'
import { Public, ParseObjectIdPipe } from '../util';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('credential')
@ApiTags('Credential Endpoints')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) { }

  @Post()
  @ApiOkResponse({ type: CredentialDTO })
  @Public()
  create(@Body() createCredentialDto: CreateCredentialDto) {
    return this.credentialService.create(createCredentialDto);
  }

  @Get()
  @ApiOkResponse({ type: [CredentialDTO] })
  @Public()
  findAll() {
    return this.credentialService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CredentialDTO })
  @Public()
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.credentialService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CredentialDTO })
  @Public()
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateCredentialDto: UpdateCredentialDTO) {
    return this.credentialService.update(id, updateCredentialDto);
  }

  // @Delete(':id')
  // @Public()
  // remove(@Param('id', ParseObjectIdPipe) id: string) {
  //   return this.credentialService.remove(+id);
  // }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto, CredentialDTO, UpdateCredentialDTO } from './dto';
import { ParseObjectIdPipe } from '../util';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ACCESS_TOKEN } from '../authN/authN.constants';

@Controller('credential')
@ApiTags('Credential Endpoints')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post()
  @ApiOkResponse({ type: CredentialDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
  create(@Body() createCredentialDto: CreateCredentialDto) {
    return this.credentialService.create(createCredentialDto);
  }

  @Get()
  @ApiOkResponse({ type: [CredentialDTO] })
  @ApiHeader({ name: ACCESS_TOKEN })
  findAll() {
    return this.credentialService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CredentialDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.credentialService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CredentialDTO })
  @ApiHeader({ name: ACCESS_TOKEN })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateCredentialDto: UpdateCredentialDTO,
  ) {
    return this.credentialService.update(id, updateCredentialDto);
  }

  @Delete(':id')
  @ApiHeader({ name: ACCESS_TOKEN })
  @ApiOkResponse({ type: String })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.credentialService.remove(id);
  }
}
